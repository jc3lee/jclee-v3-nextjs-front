import Link from "next/link"
import Earth from "../icons/Earth"
import Facebook from "../icons/Facebook"
import Instagram from "../icons/Instagram"
import Linkedin from "../icons/Linkedin"
import Mail from "../icons/Mail"
import Twitter from "../icons/Twitter"
import { INSTAGRAM_ID, LINKEDIN_ID, MAIL, TWITTER_ID, } from "../../myData/mySocials"

interface Props {
  className?: string,
}

const MySocials = ({ className }: Props) => {
  return (
    <div className={`${className} flex space-x-4 text-white mt-4`}>
      <Link href={`https://www.twitter.com/${TWITTER_ID}`}><a className="bg-blue-400 w-10 h-10 rounded-full flex justify-center items-center"><Twitter className="h-5 w-5 " /></a></Link>
      <Link href={`https://www.linkedin.com/${LINKEDIN_ID}`}><a className="bg-blue-600 w-10 h-10 rounded-full flex justify-center items-center"><Linkedin className="h-5 w-5 " /></a></Link>
      <Link href={`https://www.instagram.com/${INSTAGRAM_ID}`}><a className="bg-red-400 w-10 h-10 rounded-full flex justify-center items-center"><Instagram className="h-5 w-5 " /></a></Link>
      <Link href={`mailto:${MAIL}`}><a className="bg-gray-500 w-10 h-10 rounded-full flex justify-center items-center"><Mail className="h-5 w-5 " /></a></Link>
    </div>
  )
}

export default MySocials