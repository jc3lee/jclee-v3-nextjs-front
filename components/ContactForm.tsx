import { useCallback, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AiOutlineRight } from 'react-icons/ai';


const contactSubmittedToastId = "contact-submitted-toast-id";

const handleContactSubmitted = () => {
  toast.success("Your request or inquiry has been submitted!", {
    autoClose: 1500,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT,
    toastId: contactSubmittedToastId,
  });
}

interface Props {
  className?: string,
}

type Inputs = {
  name: string,
  email: string,
  text: string,
}

const ContactForm = ({ className, }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<Inputs>();
  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    reset({ name: "", email: "", text: "", })
    // console.log(data)
    //toast saying contact request submitted even if it failed
    handleContactSubmitted()
    if (!executeRecaptcha) {
      console.log("recaptcha sucks!");
      return
    }
    const recaptchaToken = await executeRecaptcha('ADD_CONTACT')
    const ctcRes = await fetch("/api/create-contact", {
      method: "POST",
      body: JSON.stringify({ ...data, recaptchaToken, }),
      // body: JSON.stringify({ ...data, }),
    })
    const resData = await ctcRes.json()
    // console.log("ctc details", resData);
    if (!resData || !resData.success) {
      // handle submit error
    }
  }

  return (
    <form className={`${className} flex flex-col items-start`} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="contactNameId" className="text-sm">Name *</label>
      <input id="contactNameId" className="rounded-sm py-1 px-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-700" {...register('name', { required: true })} />
      <label htmlFor="contactEmailId" className="mt-4 text-sm">Email address *</label>
      <input type="email" id="contactEmailId" className="rounded-sm py-1 px-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-700" {...register('email', { required: true, })} />
      <label htmlFor="requestId" className="mt-4 text-sm">Your request or inquiry</label>
      <textarea id="requestId" className="w-full min-h-[10rem] rounded-sm py-1 px-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-700" {...register('text', { required: true })} />
      <p className="text-xs text-gray-500 tracking-tight">
        This site is protected by reCAPTCHA and the Google
        <a rel="noopener noreferrer" className="underline ml-1" target="_blank" href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a rel="noopener noreferrer" className="underline ml-1" target="_blank" href="https://policies.google.com/terms">Terms of Service</a> apply.
      </p>
      <button className="group text-sm focus:outline-none mt-5 bg-blue-700 bg-opacity-90 hover:bg-opacity-80 focus:bg-opacity-80 transition duration-100 tracking-wide text-white rounded-sm py-2 w-36 px-4 font-semibold flex justify-center items-center ">
        <span className="capitalize relative translate-x-2 group-hover:translate-x-0 transition-transform duration-300">submit</span>
        <AiOutlineRight className="group-hover:opacity-100 opacity-0 relative left-2 h-4 w-4 transition-opacity duration-300" aria-hidden={true} />
      </button>
    </form>
  )
}

export default ContactForm