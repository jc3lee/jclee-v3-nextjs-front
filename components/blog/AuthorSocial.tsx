import Link from "next/link"
import { ImEarth } from "react-icons/im"
import { FaLinkedinIn } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"
import { HiMail } from "react-icons/hi"
import { ImTwitter } from "react-icons/im"
import { ImFacebook } from "react-icons/im"

interface Props {
  socialAccounts: any,
  email: string,
  className?: string,
}

const AuthorSocials = ({ className, socialAccounts, email }: Props) => {
  const { twitterId, linkedinId, instagramId, } = socialAccounts
  return (
    <div className={`${className} flex space-x-6 text-black mt-4`}>
      {twitterId && <Link href={`https://www.twitter.com/${twitterId}`}><a className=""><ImTwitter className="h-5 w-5 " /></a></Link>}
      {linkedinId && <Link href={`https://www.linkedin.com/${linkedinId}`}><a className=""><FaLinkedinIn className="h-5 w-5 " /></a></Link>}
      {instagramId && <Link href={`https://www.instagram.com/${instagramId}`}><a className=""><RiInstagramFill className="h-5 w-5 " /></a></Link>}
      {email && <Link href={`mailto:${email}`}><a className=""><HiMail className="h-5 w-5 " /></a></Link>}
    </div>
  )
}

export default AuthorSocials