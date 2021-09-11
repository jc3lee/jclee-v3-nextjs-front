import { FiLink } from "react-icons/fi"

interface Props {
  alt?: string,
  className?: string,
}

const LinkTo = ({ alt, className, }: Props) => {
  return (
    <div>
      <FiLink className={className} />
      <span className="sr-only">{alt || "Link"}</span>
    </div>
  )
}

export default LinkTo