import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';
import { StoreContext } from "../hooks/StoreContext"
import { ItemProps } from '../sanity/queries';
import { getCartFromStorage } from '../stripe/items';
// import smoothscroll from 'smoothscroll-polyfill';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initCart = getCartFromStorage()
    if (initCart.length > 0) setCart(initCart)
  }, [])

  const [cart, setCart] = useState<{ itemId: string, qty: number }[]>([])

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
      <StoreContext.Provider value={{ cart, setCart }} >
        <Component {...pageProps} />
        <ToastContainer />
      </StoreContext.Provider>
    </GoogleReCaptchaProvider >
  </>)
}
export default MyApp