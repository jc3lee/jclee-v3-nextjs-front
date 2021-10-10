import Link from "next/link"
import { ImEarth } from "react-icons/im"
import { FaLinkedinIn } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { HiMail } from "react-icons/hi"
import { ImTwitter } from "react-icons/im"
import { ImFacebook } from "react-icons/im"

interface Props {
  socialAccounts?: {
    instagramId?: string,
    twitterId?: string,
    facebookId?: string,
    linkedinId?: string,
  },
  websiteUrl?: string,
  mail?: string,
  className?: string,
}

const Socials = ({ mail, socialAccounts, websiteUrl, className }: Props) => {
  if (!mail && !socialAccounts && !websiteUrl) return null
  const { instagramId, twitterId, facebookId, linkedinId, } = socialAccounts || {}
  return (
    <div className={className}>
      {instagramId && <Link href={`https://www.instagram.com/${instagramId}`}><a><RiInstagramFill className="h-7 w-7 hover:text-red-500" /></a></Link>}
      {facebookId && <Link href={`https://www.facebook.com/${facebookId}`}><a><ImFacebook className="h-7 w-7 hover:text-blue-700" /></a></Link>}
      {linkedinId && <Link href={`https://www.linkedin.com/${linkedinId}`}><a><FaLinkedinIn className="h-7 w-7 hover:text-blue-600" /></a></Link>}
      {twitterId && <Link href={`https://www.twitter.com/${twitterId}`}><a><ImTwitter className="h-7 w-7 hover:text-blue-500" /></a></Link>}
      {mail && <Link href={`mailto:${mail}`}><a><HiMail className="h-7 w-7 hover:text-gray-600" /></a></Link>}
      {websiteUrl && <Link href={websiteUrl}><a><ImEarth className="h-7 w-7 hover:text-green-500" /></a></Link>}
    </div>
  )
}

export default Socials