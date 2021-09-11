import { HiOutlineDotsVertical } from "react-icons/hi"

interface Props {
  alt: string,
  className?: string,
}

const ThreeDotsV = ({ alt, className, }: Props) => {
  return (
    <div>
      <HiOutlineDotsVertical className={className} />
      <span className="sr-only">{alt}</span>
    </div>
  )
}

export default ThreeDotsV