import { SanityDocument } from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity/client';

type Data = {
  success: boolean,
  contactDoc?: SanityDocument
}

const saveCommentToSanity = (email: string, name: string, text: string,) => {
  return client.config({
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  }).create({
    _type: "contact",
    email,
    name,
    text,
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
      const contactDoc = await saveCommentToSanity(email, name, text,)
      return res.status(200).json({ success: true, contactDoc })
    } catch (err: any) {
      // console.log("failed to add comment", err.message);
      return res.status(500).json({ success: false })
    }
  } else {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }
}