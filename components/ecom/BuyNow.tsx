import { FormEvent, useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BUY_NOW_ACTION } from '../../myConfig/recapConfig';
import getStripe from '../../stripe/get-stripejs';
import { ItemsType } from '../../stripe/items';
import { fetchPostJSON } from '../../utils/api-helpers';
import { wwwEncode } from '../../utils/dataConversionFns';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = getStripe()

interface Props {
  items: ItemsType,
  pathname: string,
  btnText?: string,
  className?: string,
}

const BuyNow = ({ className, items, pathname, btnText = "Checkout" }: Props) => {
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log(data)
    if (!executeRecaptcha) {
      console.log("recaptcha sucks!");
      return
    }
    const recaptchaToken = await executeRecaptcha(BUY_NOW_ACTION)
    console.log("here1");
    await fetch("/api/checkout-sessions")
  }

  return (
    <div className="">
      <form className={`${className}`} onSubmit={handleSubmit}>
        <button type="submit" role="link">
          {btnText}
        </button>
      </form>
      <form action="/api/checkout-sessions" method="GET">
        <button type="submit" role="link">
          {btnText}
        </button>
      </form>
    </div>
  )
}

export default BuyNow