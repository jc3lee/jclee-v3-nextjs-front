// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity/client';

type Data = {
  success: boolean
}

const saveCommentToSanity = (name: string, text: string, _id: string) => {
  return client.config({
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  }).create({
    _type: "comment",
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
    // const { name, text, _id, recaptchaToken } = JSON.parse(req.body)
    // console.log("name", name, "text", text, "_id", _id, "recaptchaToken", recaptchaToken);
    const { name, text, _id, } = JSON.parse(req.body)
    console.log("name", name, "text", text, "_id", _id,);
    try {
      // const reCaptchaData = await checkReCaptcha(recaptchaToken)
      // console.log("reCaptchaData", reCaptchaData);
      const commentDocPromise = saveCommentToSanity(name, text, _id)
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