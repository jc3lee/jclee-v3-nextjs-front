import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai"
import { slogan } from '../../myData/myBrandConfig'
import DividerV from '../blog/DividerV'


const MyMainTopNav = () => {
  const router = useRouter()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  // console.log("router", router.pathname);
  const currentPath = router.pathname
  const [isMenuActive, setIsMenuActive] = useState(false)

  const closeMenuIfOpened = () => {
    if (!isMenuActive) return
    handleHamToggle()
    // console.log("called close");
  }

  const closeMenuAndScrollToTop = () => {
    scrollToTopOfPage()
    closeMenuIfOpened()
  }

  const scrollToTopOfPage = () => {
    if (window) window.scrollTo(0, 0)
  }

  const handleHamToggle = () => {
    setIsMenuActive(!isMenuActive)
    if (!document || !mobileMenuRef.current) return
    if (!mobileMenuRef.current.classList.contains("fixed")) {
      mobileMenuRef.current.classList.add("fixed")
      mobileMenuRef.current.classList.remove("hidden")
      // document.body.classList.add("overflow-hidden")
    } else {
      mobileMenuRef.current.classList.add("hidden")
      mobileMenuRef.current.classList.remove("fixed")
      // document.body.classList.remove("overflow-hidden")
    }
  }

  useEffect(() => {
    // make sure to get scroll back when the user leaves this page
    return () => { document.body.classList.remove("overflow-hidden") }
  }, [])

  return (
    <div className="mb-14 lg:mb-28">
      <div className="fixed top-0 z-40 inset-x-0 border-b">
        <nav className="relative bg-white px-4 max-w-screen-xl mx-auto py-4 lg:py-6">
          <div className="w-full flex items-center relative z-50">
            <div className="flex items-center">
              <Link href="/#"><a onClick={closeMenuAndScrollToTop} className="focus:outline-none leading-none text-2xl lg:text-3xl mr-4">JC LEE</a></Link>
              <DividerV className="h-6 border-gray-400 hidden md:inline-block" />
              <span className="ml-4 text-gray-500 text-sm hidden md:inline-block">{slogan}</span>
            </div>
            <div className="flex-1"></div>
            <div className="text-sm uppercase flex items-center flex-wrap font-semibold tracking-tight" onClick={closeMenuIfOpened}>
              <Link href="/blog"><a className={`hidden sm:block mr-3 md:mr-4 py-0.5`}>Blog</a></Link>
              <Link href="#services"><a className={`hidden sm:block mr-3 md:mr-4 py-0.5`}>Services</a></Link>
              <Link href="#about"><a className="hidden sm:block mr-3 md:mr-4 py-0.5">About Me</a></Link>
              <Link href="#contact"><a className="py-0.5 bg-blue-700 px-2 text-white hover:scale-[1.03] transition-transform duration-200">Contact</a></Link>
            </div>
            <div className="sm:hidden">
              <button className="focus:outline-none flex items-center ml-2 px-2 overflow-hidden" onClick={handleHamToggle} >
                {!isMenuActive && <AiOutlineMenu className="w-6 h-6" />}
                {isMenuActive && <AiOutlineClose className="w-6 h-6" />}
              </button>
            </div>
          </div>
          <div ref={mobileMenuRef} onClick={closeMenuIfOpened} className="hidden inset-0 ">
            <div className="absolute inset-0 mt-14 bg-black bg-opacity-30"></div>
            <div className="relative mt-14 z-[999] bg-white border pt-4 pb-8 px-4 text-sm uppercase overflow-hidden font-semibold tracking-wide">
              <div className="flex pl-4">
                <div className="flex-1">
                  <Link href="/blog"><a className="p-1">Blog</a></Link>
                </div>
                <div className="flex-1">
                  <Link href="#about"><a className="p-1">About Me</a></Link>
                </div>
              </div>
              <div className="flex mt-4 pl-4">
                <div className="flex-1">
                  <Link href="#services"><a className="p-1">Services</a></Link>
                </div>
                <div className="flex-1">
                  <Link href="#contact"><a className="p-1">Contact</a></Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MyMainTopNav