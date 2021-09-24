import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity/client';

type Data = {
  success: boolean
}

const saveCommentToSanity = (email: string, name: string, text: string, _id: string) => {
  return client.config({
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  }).create({
    _type: "comment",
    email,
    name,
    text,
    post: {
      _type: "reference",
      _ref: _id,
    }
  })
}

const checkReCaptcha = async (recaptchaToken: string) => {
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`

  const result = await fetch(verifyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  const data = await result.json()
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { name, email, text, _id, recaptchaToken } = JSON.parse(req.body)
    // console.log("name", name, "email", email, "text", text, "_id", _id, "recaptchaToken", recaptchaToken);
    try {
      const reCaptchaData = await checkReCaptcha(recaptchaToken)
      // console.log("reCaptchaData", reCaptchaData);
      // console.log("score", reCaptchaData.score);
      // prevent bots look-alike to post
      if (!reCaptchaData || reCaptchaData.score < 0.5) throw new Error("Internal Error")
      const commentDocPromise = saveCommentToSanity(email, name, text, _id)
      res.status(200).json({ success: true })
      commentDocPromise.then((commentDoc) => {
        // console.log("new comment doc", commentDoc);
      })
    } catch (err: any) {
      // console.log("failed to add comment", err.message);
      res.status(500).json({ success: false })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}