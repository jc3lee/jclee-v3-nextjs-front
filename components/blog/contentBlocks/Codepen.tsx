import Link from "next/link"

const codepenRegex = /codepen[a-zA-Z./\-]+/


function getCodepenUserAndHash(url: string) {
  const codepenSegment = url.match(codepenRegex)?.[0] || ""
  if (!codepenSegment) return {}
  const codepenSegmentArr = codepenSegment.split("/")
  if (codepenSegmentArr.length !== 4) return {}
  const codepenUser = codepenSegmentArr[1]
  const codepenHash = codepenSegmentArr[3]
  return {
    codepenUser,
    codepenHash,
  }
}

interface Props {
  url: string,
  title?: string,
}

const Codepen = ({ url, title = "codepen" }: Props) => {
  const { codepenUser, codepenHash, } = getCodepenUserAndHash(url)
  if (codepenUser || !codepenHash) return (
    <div className="flex justify-center items-center text-base border mt-8 border-gray-400 text-center" style={{ width: "100%", height: "600px", }}>
      <p className="max-w-md">Failed to load codepen at <Link href={url}><a target="_blank" rel="noopener noreferrer" className="underline">{url}</a></Link>.</p>
    </div>
  )

  return (
    <div className="mt-8">
      <iframe height="600" style={{ width: "100%", }} scrolling="no" title={title} src={`https://codepen.io/${codepenUser}/embed/preview/${codepenHash}?height=600&theme-id=dark&default-tab=result`} frameBorder="no" loading="lazy" allowTransparency={true} allowFullScreen={true}>
        See the Pen <a href={`https://codepen.io/${codepenUser}/pen/${codepenHash}`}>{title}</a> by {codepenUser}
        (<a href={`https://codepen.io/${codepenUser}`}>@{codepenUser}</a>) on <a href='https://codepen.io'>CodePen</a>.
      </iframe>
    </div >
  )
}

export default Codepen