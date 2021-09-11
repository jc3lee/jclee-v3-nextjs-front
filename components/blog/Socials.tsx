import Link from "next/link"
import Earth from "../icons/Earth"
import Facebook from "../icons/Facebook"
import Instagram from "../icons/Instagram"
import Linkedin from "../icons/Linkedin"
import Mail from "../icons/Mail"
import Twitter from "../icons/Twitter"

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
      {instagramId && <Link href={`https://www.instagram.com/${instagramId}`}><a><Instagram className="h-7 w-7 hover:text-red-500" /></a></Link>}
      {facebookId && <Link href={`https://www.facebook.com/${facebookId}`}><a><Facebook className="h-7 w-7 hover:text-blue-700" /></a></Link>}
      {linkedinId && <Link href={`https://www.linkedin.com/${linkedinId}`}><a><Linkedin className="h-7 w-7 hover:text-blue-600" /></a></Link>}
      {twitterId && <Link href={`https://www.twitter.com/${twitterId}`}><a><Twitter className="h-7 w-7 hover:text-blue-500" /></a></Link>}
      {mail && <Link href={`mailto:${mail}`}><a><Mail className="h-7 w-7 hover:text-gray-600" /></a></Link>}
      {websiteUrl && <Link href={websiteUrl}><a><Earth className="h-7 w-7 hover:text-green-500" alt={websiteUrl} /></a></Link>}
    </div>
  )
}

export default Socials