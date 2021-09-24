import Link from 'next/link'
import Search from '../components/icons/Search'
import { Turn as Ham } from 'hamburger-react'
import DividerV from '../components/blog/DividerV'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { slogan } from '../myData/myBrandConfig'

const MyTopNav = () => {
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  // console.log("router", router.pathname);
  const currentPath = router.pathname

  const handleHamToggle = (toggled: boolean) => {
    if (!document || !mobileMenuRef.current) return
    if (toggled) {
      mobileMenuRef.current.classList.add("fixed")
      mobileMenuRef.current.classList.remove("hidden")
      document.body.classList.add("overflow-hidden")
    } else {
      mobileMenuRef.current.classList.add("hidden")
      mobileMenuRef.current.classList.remove("fixed")
      document.body.classList.remove("overflow-hidden")
    }
  }

  useEffect(() => {
    // make sure to get scroll back when the user leaves this page
    return () => { document.body.classList.remove("overflow-hidden") }
  }, [])

  return (
    <div className="border-b">
      <nav className="relative z-10 bg-white px-4 max-w-screen-xl mx-auto py-2 lg:py-6">
        <div className="w-full flex items-center relative z-50">
          <Link href="/blog"><a className="focus:outline-none leading-none text-2xl lg:text-3xl mr-4">JC LEE</a></Link>
          <DividerV className="h-6 mt-0.5 border-gray-400 hidden md:inline-block" />
          <span className="ml-4 text-gray-500 text-sm hidden md:inline-block">{slogan}</span>
          <div className="flex-1"></div>
          <Link href="/blog/search"><a className="focus:outline-none mr-4 mt-1">
            <span className="sr-only">search</span>
            <Search className="w-7 h-7" />
          </a></Link>
          <div className="md:hidden"><Ham direction="left" onToggle={handleHamToggle} /></div>
        </div>
        <div ref={mobileMenuRef} className="hidden inset-0 bg-white">
          <div className="border mt-24 py-4 px-4 text-sm uppercase grid grid-cols-2 gap-y-4 overflow-hidden font-semibold tracking-wide">
            <Link href="/blog"><a className="pl-4">Home</a></Link>
            <Link href="/blog/latest"><a className="pl-4">Latest</a></Link>
            <Link href="/blog/category/webdev"><a className="pl-4">Webdev</a></Link>
            <Link href="/blog/category/design"><a className="pl-4">Design</a></Link>
            <Link href="/blog/category/insights"><a className="pl-4">Insights</a></Link>
          </div>
        </div>
        <div className="mt-2 lg:mt-4 text-sm uppercase flex items-center flex-wrap font-semibold tracking-wide">
          <Link href="/blog"><a className={`${currentPath === "/blog" ? "bg-blue-700 text-white px-2" : ""} mr-2 md:mr-4 py-0.5`}>Home</a></Link>
          <Link href="/blog/latest"><a className={`${currentPath === "/blog/latest" ? "bg-blue-700 text-white px-2" : ""} mr-2 md:mr-4 py-0.5`}>Latest</a></Link>
          <Link href="/blog/category/webdev"><a className="mr-2 md:mr-4 py-0.5">Webdev</a></Link>
          <Link href="/blog/category/design"><a className="mr-2 md:mr-4 py-0.5">Design</a></Link>
          <Link href="/blog/category/insights"><a className="mr-2 md:mr-4 py-0.5">Insights</a></Link>
        </div>
      </nav>
    </div>
  )
}

export default MyTopNav