import { HiMail } from "react-icons/hi"

interface Props {
  alt?: string,
  className?: string,
}

const Mail = ({ alt, className, }: Props) => {
  return (
    <div>
      <HiMail className={className} />
      <span className="sr-only">{alt || "Email"}</span>
    </div>
  )
}

export default Mail