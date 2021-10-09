// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from "stripe"
import { ItemsType } from '../../../stripe/items';
import { wwwDecode } from '../../../utils/dataConversionFns';
import { checkReCaptcha } from '../../../utils/recaptcha';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

type Data = {
  redirect: string,
}

const getLineItems = (items: ItemsType) => {
  // can run some validation checks here
  // return formatted items
  return items.map(i => ({
    price: i.priceData,
    quantity: i.quantity,
  }))
}

type requestBody = {
  items: ItemsType,
  recaptchaToken: string,
  pathname: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log("headers", { ...req.headers, cookie: "" });
  // console.log("req", { ...req, rawHeaders: "", });
  // const { items, pathname, recaptchaToken, } = wwwDecode(req.query)
  // console.log("items", items, "pathname", pathname,);
  // return res.status(200).json({ name: "nothing" })
  if (req.method === 'POST') {
    try {
      console.log("here2");
      // const { items, pathname, recaptchaToken, } = wwwDecode(req.query.data)
      const { items, pathname, recaptchaToken, } = JSON.parse(req.body)
      // console.log("items", items, "pathname", pathname,);
      // const reCaptchaData = await checkReCaptcha(recaptchaToken)
      // console.log("reCaptchaData", reCaptchaData);
      // console.log("score", reCaptchaData.score);
      // prevent bots look-alike to buy
      // if (!reCaptchaData || reCaptchaData.score < 0.5) throw new Error("Internal Error")
      // Get Items 
      // let lineItems
      // if (items) {
      const lineItems = getLineItems(items)
      // } else {
      // lineItems = [
      //   {
      //     price: process.env.NEXT_PUBLIC_PRICE_ID!,
      //     quantity: 1,
      //   }
      // ]
      // }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          ...lineItems,
        ],
        payment_method_types: [
          'card',
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/${pathname}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/${pathname}/?canceled=true`,
      });
      console.log("here3");
      res.status(200).json({ redirect: session.url ?? `${req.headers.origin}/${pathname}/?canceled=true` })
      //redirect works only from html forms
      // res.redirect(303, session.url ?? `${req.headers.origin}/${pathname}/?canceled=true`);
    } catch (err: any) {
      console.log("here4", err.message);
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}