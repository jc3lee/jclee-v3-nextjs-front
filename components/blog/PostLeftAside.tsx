import Link from "next/link"
import { useEffect, useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getFacebookShareLink, getLinkedinShareLink, getMailShareLink, getTwitterShareLink } from "../../utils/socialFns"
import Facebook from "../icons/Facebook"
import LinkTo from "../icons/Link"
import Linkedin from "../icons/Linkedin"
import Mail from "../icons/Mail"
import Twitter from "../icons/Twitter"
import { toast } from 'react-toastify';
import { useGetUrl } from "../../hooks/urlHooks"

interface Props {
  url: string,
  title: string,
}

const copiedUrlToastId = "copied-url-toast-id";

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
    <div className="grid grid-cols-1 gap-y-4 ">
      <Link href={getFacebookShareLink(url, title)}><a>
        <Facebook className="h-5 w-5 hover:text-blue-700" /></a>
      </Link>
      <Link href={getLinkedinShareLink(url, title)}><a>
        <Linkedin className="h-5 w-5 hover:text-blue-600" /></a>
      </Link>
      <Link href={getTwitterShareLink(url, title)}><a><Twitter className="h-5 w-5 hover:text-blue-500" /></a></Link>
      <div className="relative">
        <CopyToClipboard text={copyText} onCopy={handleCopy}>
          <button className=""><LinkTo className="h-5 w-5 hover:text-green-600" /></button>
        </CopyToClipboard>
      </div>
      <Link href={getMailShareLink(url, title)}><a><Mail className="h-5 w-5 hover:text-red-600 -mt-1" /></a></Link>
    </div>
  )
}

export default PostLeftAside