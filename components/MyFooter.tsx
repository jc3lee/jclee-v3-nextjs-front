import Link from 'next/link'
import { getCurrentYear } from '../utils/dateFns'
import MySocials from './blog/MySocials'

const MyFooter = () => {
  return (
    <div className="py-12 w-full flex flex-col bg-blue-900 items-center">
      <p className=" uppercase text-2xl text-gray-100">JC Lee</p>
      <p className="flex flex-wrap justify-center mt-4 uppercase space-x-4  text-gray-300 text-sm max-w-sm px-4">
        <Link href="/"><a className="mt-4">Home</a></Link>
        <Link href="/"><a className="mt-4">Latest</a></Link>
        <Link href="/"><a className="mt-4">Webdev</a></Link>
        <Link href="/"><a className="mt-4">Design</a></Link>
        <Link href="/"><a className="mt-4">Insights</a></Link>
        <Link href="/"><a className="mt-4">Contact</a></Link>
        <Link href="/"><a className="mt-4">Projects</a></Link>
        <Link href="/"><a className="mt-4">Advertising</a></Link>
      </p>
      <p className="mt-10 text-gray-300 text-sm">Get in touch</p>
      <MySocials />
      <p className="mt-6 text-gray-300 text-sm">© JC Lee, Auto-entrepreneur {getCurrentYear()}</p>
      <p className="mt-2 flex justify-center uppercase text-gray-300 text-sm">
        <Link href="/"><a className="mr-2">privacy</a></Link>|
        <Link href="/"><a className="ml-2">terms of use</a></Link>
      </p>
    </div>
  )
}

export default MyFooter