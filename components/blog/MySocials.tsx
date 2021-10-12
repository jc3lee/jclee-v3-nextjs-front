import Link from "next/link"
import { ImEarth } from "react-icons/im"
import { FaLinkedinIn } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { HiMail } from "react-icons/hi"
import { ImTwitter } from "react-icons/im"
import { ImFacebook } from "react-icons/im"
import { INSTAGRAM_ID, LINKEDIN_ID, MAIL, TWITTER_ID, } from "../../myData/mySocials"

interface Props {
  className?: string,
}

const MySocials = ({ className }: Props) => {
  return (
    <div className={`${className} flex space-x-4 text-white mt-4`}>
      <a href={`https://www.twitter.com/${TWITTER_ID}`} rel="noreferrer noopener" className="bg-blue-400 w-10 h-10 rounded-full flex justify-center items-center hover:brightness-105 transition-all duration-200">
        <ImTwitter className="h-5 w-5 " />
        <span className="sr-only">Twitter</span>
      </a>
      <a href={`https://www.linkedin.com/${LINKEDIN_ID}`} rel="noreferrer noopener" className="bg-blue-600 w-10 h-10 rounded-full flex justify-center items-center hover:brightness-105 transition-all duration-200">
        <FaLinkedinIn className="h-5 w-5 " />
        <span className="sr-only">Linkedin</span>
      </a>
      <a href={`https://www.instagram.com/${INSTAGRAM_ID}`} rel="noreferrer noopener" className="bg-red-400 w-10 h-10 rounded-full flex justify-center items-center hover:brightness-105 transition-all duration-200">
        <RiInstagramFill className="h-5 w-5 " />
        <span className="sr-only">Instagram</span>
      </a>
      <a href={`mailto:${MAIL}`} className="bg-gray-500 w-10 h-10 rounded-full flex justify-center items-center hover:brightness-105 transition-all duration-200">
        <HiMail className="h-5 w-5 " />
        <span className="sr-only">Email</span>
      </a>
    </div>
  )
}

export default MySocials