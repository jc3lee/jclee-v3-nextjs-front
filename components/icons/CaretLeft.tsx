import { AiOutlineLeft } from "react-icons/ai"

interface Props {
  alt?: string,
  className?: string,
}

const CaretLeft = ({ alt, className, }: Props) => {
  return (
    <div>
      <AiOutlineLeft className={className} />
      <span className="sr-only">{alt || "left"}</span>
    </div>
  )
}

export default CaretLeft