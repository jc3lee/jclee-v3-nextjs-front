import { ImTwitter } from "react-icons/im"

interface Props {
  alt?: string,
  className?: string,
}

const Twitter = ({ alt, className, }: Props) => {
  return (
    <div>
      <ImTwitter className={className} />
      <span className="sr-only">{alt || "Twitter"}</span>
    </div>
  )
}

export default Twitter