import { AiOutlineRight } from "react-icons/ai"

interface Props {
  alt?: string,
  className?: string,
}

const CaretRight = ({ alt, className, }: Props) => {
  return (
    <div>
      <AiOutlineRight className={className} />
      <span className="sr-only">{alt || "right"}</span>
    </div>
  )
}

export default CaretRight