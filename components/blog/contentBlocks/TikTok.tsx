import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { useScript } from "../../../hooks/useScript"

const tiktokRegex = /tiktok[\@a-zA-Z./0-9\_\-]+/
const blockquoteRegex = /<blockquote.+?<\/blockquote>/g

function getTikTokUserAndId(url = "") {
  const tiktokSegment = (url.match(tiktokRegex) || [""])[0]
  if (!tiktokSegment) return {}
  const tiktokSegmentArr = tiktokSegment.split("/")
  if (tiktokSegmentArr.length < 4) return {}
  const tiktokUser = tiktokSegmentArr[1]
  const tiktokId = tiktokSegmentArr[3]
  return {
    tiktokUser,
    tiktokId,
  }
}

function getTikTokPostHtmlWithoutScript(postHtml: string) {
  const postHtmlWithoutScript = (postHtml.match(blockquoteRegex) || [""])[0]
  return postHtmlWithoutScript
}

const fetchPost = async (tiktokUser: string, tiktokId: string) => {
  const res = await fetch(`https://www.tiktok.com/oembed?url=https://www.tiktok.com/${tiktokUser}/video/${tiktokId}`)
  const data = await res.json()
  return data
}

const getPostFromUserNameAndId = async (tiktokUser: string, tiktokId: string, setPostHtml: Dispatch<SetStateAction<string>>) => {
  const postData = await fetchPost(tiktokUser, tiktokId,)
  const postHtml = getTikTokPostHtmlWithoutScript(postData.html)
  setPostHtml(postHtml)
}

interface Props {
  url: string,
}

const TikTok = ({ url }: Props) => {
  const [postHtml, setPostHtml] = useState("")
  const [loaded, error] = useScript("/tiktokScript.js", [postHtml])
  const { tiktokUser, tiktokId, } = getTikTokUserAndId(url)
  useEffect(() => {
    if (!tiktokUser || !tiktokId) return
    getPostFromUserNameAndId(tiktokUser, tiktokId, setPostHtml)
  }, [tiktokId])

  if (!tiktokUser || !tiktokId) return null
  return (
    <div dangerouslySetInnerHTML={{ __html: postHtml }}></div>
  )
}

export default TikTok