import { TwitterTweetEmbed } from "react-twitter-embed"
const twitterRegex = /twitter[a-zA-Z./0-9\_\-]+/

function getTweetUserAndId(url = "") {
  const tweetSegment = (url.match(twitterRegex) || [""])[0]
  if (!tweetSegment) return {}
  const tweetSegmentArr = tweetSegment.split("/")
  if (tweetSegmentArr.length < 4) return {}
  const tweetUser = tweetSegmentArr[1]
  const tweetId = tweetSegmentArr[3]
  return {
    tweetUser,
    tweetId,
  }
}

interface Props {
  url: string,
}

const Twitter = ({ url }: Props) => {
  if (!url) return null
  const { tweetUser, tweetId, } = getTweetUserAndId(url)
  if (!tweetId) return null
  return (
    <div className="twitter-center">
      <TwitterTweetEmbed tweetId={tweetId} />
    </div>
  )
}

export default Twitter