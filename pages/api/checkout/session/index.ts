// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

type Data = {
  error: boolean,
  errorMessage: string,
  email: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    try {
      console.log("here session");
      const { id } = JSON.parse(req.body)
      const session = await stripe.checkout.sessions.retrieve(id,)
      // console.log("session customer details", session.customer_details);

      if (session.customer_details?.email) {
        res.status(200).json({ email: session.customer_details.email || "", error: false, errorMessage: "" })
      } else {
        res.status(200).json({ email: "", error: true, errorMessage: "No email" })
      }
    } catch (err: any) {
      console.log("here4", err.message);
      res.status(err.statusCode || 500).json({ email: "", error: true, errorMessage: (err.message as string), });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ email: "", error: true, errorMessage: "Method Not Allowed", });
  }
}