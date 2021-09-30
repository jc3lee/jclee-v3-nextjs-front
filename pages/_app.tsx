import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
// import smoothscroll from 'smoothscroll-polyfill';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // kick off the polyfill!
    // smoothscroll.polyfill();
    // smooth not working with next link
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (<>
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}>
      <Component {...pageProps} />
      <ToastContainer />
    </GoogleReCaptchaProvider >
  </>)
}
export default MyApp