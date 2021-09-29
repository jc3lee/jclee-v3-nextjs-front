import Link from 'next/link'
import { getCurrentYear } from '../utils/dateFns'
import MySocials from './blog/MySocials'

const MyFooter = () => {
  return (
    <footer className="py-12 w-full flex flex-col bg-blue-900 items-center">
      <p className=" uppercase text-2xl text-gray-100">JC Lee</p>
      <p className="flex flex-wrap justify-center mt-4 uppercase space-x-4  text-gray-300 text-sm max-w-sm px-4">
        <Link href="/#"><a className="mt-4">Home</a></Link>
        <Link href="/#projects"><a className="mt-4">Projects</a></Link>
        <Link href="/#about"><a className="mt-4">About Me</a></Link>
        <Link href="/#contact"><a className="mt-4">Contact</a></Link>
        <Link href="/blog"><a className="mt-4">Blog</a></Link>
        <Link href="/blog/latest"><a className="mt-4">Latest Posts</a></Link>
        <Link href="/blog/category/webdev"><a className="mt-4">Webdev</a></Link>
        <Link href="/blog/category/design"><a className="mt-4">Design</a></Link>
        <Link href="/blog/category/insights"><a className="mt-4">Insights</a></Link>
      </p>
      <p className="mt-10 text-gray-300 text-sm">Get in touch</p>
      <MySocials />
      <p className="mt-6 text-gray-300 text-sm">© JC Lee, Auto-entrepreneur {getCurrentYear()}</p>
      <p className="mt-2 flex justify-center uppercase text-gray-300 text-sm">
        <Link href="/privacy"><a className="mr-2">privacy</a></Link>|
        <Link href="/terms-of-use"><a className="ml-2">terms of use</a></Link>
      </p>
    </footer>
  )
}

export default MyFooter