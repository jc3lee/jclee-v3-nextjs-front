import { RiInstagramFill } from "react-icons/ri"

interface Props {
  alt?: string,
  className?: string,
}

const Instagram = ({ alt, className, }: Props) => {
  return (
    <div>
      <RiInstagramFill className={className} />
      <span className="sr-only">{alt || "Instagram"}</span>
    </div>
  )
}

export default Instagram