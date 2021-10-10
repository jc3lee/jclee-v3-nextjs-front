import Link from "next/link"
import { useEffect, useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getFacebookShareLink, getLinkedinShareLink, getMailShareLink, getTwitterShareLink } from "../../utils/socialFns"
import { ImFacebook } from "react-icons/im"
import { FiLink } from "react-icons/fi"
import { FaLinkedinIn } from "react-icons/fa"
import { HiMail } from "react-icons/hi"
import { ImTwitter } from "react-icons/im"
import { toast } from 'react-toastify';
import { useGetUrl } from "../../hooks/urlHooks"
import { copiedUrlToastId } from "../../myConfig/toastConfig"

interface Props {
  url: string,
  title: string,
}

const handleCopy = (text: string, result: boolean) => {
  if (result)
    toast.success("Link copied!", {
      autoClose: 2000,
      hideProgressBar: true,
      position: toast.POSITION.TOP_CENTER,
      toastId: copiedUrlToastId,
    });
}

const PostLeftAside = ({ url, title, }: Props) => {
  const copyText = useGetUrl()

  return (
    <>
      <Link href={getFacebookShareLink(url, title)}><a>
        <ImFacebook className="h-4 w-4 md:h-5 md:w-5 hover:text-blue-700" /></a>
      </Link>
      <Link href={getLinkedinShareLink(url, title)}><a>
        <FaLinkedinIn className="h-4 w-4 md:h-5 md:w-5 hover:text-blue-600" /></a>
      </Link>
      <Link href={getTwitterShareLink(url, title)}><a><ImTwitter className="h-4 w-4 md:h-5 md:w-5 hover:text-blue-500" /></a></Link>
      <div className="relative">
        <CopyToClipboard text={copyText} onCopy={handleCopy}>
          <button className=""><FiLink className="h-4 w-4 md:h-5 md:w-5 hover:text-green-600" /></button>
        </CopyToClipboard>
      </div>
      <Link href={getMailShareLink(url, title)}><a><HiMail className="h-4 w-4 md:h-5 md:w-5 hover:text-red-600 -mt-1" /></a></Link>
    </>
  )
}

export default PostLeftAside