import { SanityDocument } from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../sanity/client';
import { checkReCaptcha } from '../../utils/recaptcha';

type Data = {
  success: boolean,
  commentDoc?: SanityDocument
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
      const commentDoc = await saveCommentToSanity(email, name, text, _id)
      return res.status(200).json({ success: true, commentDoc })
    } catch (err: any) {
      // console.log("failed to add comment", err.message);
      return res.status(500).json({ success: false })
    }
  } else {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }
}