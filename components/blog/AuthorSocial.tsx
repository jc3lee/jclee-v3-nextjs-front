import Link from "next/link"
import Earth from "../icons/Earth"
import Facebook from "../icons/Facebook"
import Instagram from "../icons/Instagram"
import Linkedin from "../icons/Linkedin"
import Mail from "../icons/Mail"
import Twitter from "../icons/Twitter"
import { INSTAGRAM_ID, LINKEDIN_ID, MAIL, TWITTER_ID, } from "../../myData/mySocials"

interface Props {
  socialAccounts: any,
  email: string,
  className?: string,
}

const AuthorSocials = ({ className, socialAccounts, email }: Props) => {
  const { twitterId, linkedinId, instagramId, } = socialAccounts
  return (
    <div className={`${className} flex space-x-6 text-black mt-4`}>
      {twitterId && <Link href={`https://www.twitter.com/${twitterId}`}><a className=""><Twitter className="h-5 w-5 " /></a></Link>}
      {linkedinId && <Link href={`https://www.linkedin.com/${linkedinId}`}><a className=""><Linkedin className="h-5 w-5 " /></a></Link>}
      {instagramId && <Link href={`https://www.instagram.com/${instagramId}`}><a className=""><Instagram className="h-5 w-5 " /></a></Link>}
      {email && <Link href={`mailto:${email}`}><a className=""><Mail className="h-5 w-5 " /></a></Link>}
    </div>
  )
}

export default AuthorSocials