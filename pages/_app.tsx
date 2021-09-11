import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (<>
    <Component {...pageProps} />
    <ToastContainer />
  </>)
}
export default MyApp