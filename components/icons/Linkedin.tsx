import { FaLinkedinIn } from "react-icons/fa"

interface Props {
  alt?: string,
  className?: string,
}

const Linkedin = ({ alt, className, }: Props) => {
  return (
    <div>
      <FaLinkedinIn className={className} />
      <span className="sr-only">{alt || "Linkedin"}</span>
    </div>
  )
}

export default Linkedin