import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BuyNow from '../components/ecom/BuyNow';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export default function PreviewPage() {
  const router = useRouter()

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <>
      <BuyNow items={[{ priceData: process.env.NEXT_PUBLIC_PRICE_ID!, quantity: 2 }]} pathname={router.pathname} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // console.log("context", context);
  // console.log("query", context.query);
  // console.log("resolvedUrl", context.resolvedUrl);
  const pathname = context.resolvedUrl.split("?")[0]
  const { price, quantity } = context.query
  if (pathname && price && quantity && typeof price === "string" && typeof quantity === "string") {
    const item = { priceId, qty }
    const res = await fetch("http://localhost:3000/api/checkout-sessions", {
      method: "POST",
      headers: {
        "origin": "http://localhost:3000",
      },
      body: JSON.stringify({ items: [{ price, quantity: Number.parseInt(quantity) }], pathname })
    })
    const { redirect } = await res.json()
    console.log("redirect", redirect);
    if (redirect) {
      return {
        redirect: {
          destination: redirect,
          permanent: false,
        }
      }
    }
    else {
      return {
        props: {

        }
      }
    }
  } else {
    return {
      props: {

      }
    }
  }
}