import { HiOutlineDotsHorizontal } from "react-icons/hi"

interface Props {
  alt: string,
  className?: string,
}

const ThreeDotsH = ({ alt, className, }: Props) => {
  return (
    <div>
      <HiOutlineDotsHorizontal className={className} />
      <span className="sr-only">{alt}</span>
    </div>
  )
}

export default ThreeDotsH