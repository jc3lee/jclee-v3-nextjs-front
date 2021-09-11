import { AiOutlineDoubleRight } from "react-icons/ai"

interface Props {
  alt?: string,
  className?: string,
}

const CaretDbRight = ({ alt, className, }: Props) => {
  return (
    <div>
      <AiOutlineDoubleRight className={className} />
      <span className="sr-only">{alt || "left"}</span>
    </div>
  )
}

export default CaretDbRight