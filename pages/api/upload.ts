import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import path from "path"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm({ uploadDir: path.join(process.cwd(), "uploads"), keepExtensions: true, multiples: true, })
  form.parse(req, (err, fields, files) => {
    // console.log("err", err, "fields", fields, "files", files);
  })
}