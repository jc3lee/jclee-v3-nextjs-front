import { ImFacebook } from "react-icons/im"

interface Props {
  alt?: string,
  className?: string,
}

const Facebook = ({ alt, className, }: Props) => {
  return (
    <div>
      <ImFacebook className={className} />
      <span className="sr-only">{alt || "Facebook"}</span>
    </div>
  )
}

export default Facebook