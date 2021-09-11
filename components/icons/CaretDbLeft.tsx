import { AiOutlineDoubleLeft } from "react-icons/ai"

interface Props {
  alt?: string,
  className?: string,
}

const CaretDbLeft = ({ alt, className, }: Props) => {
  return (
    <div>
      <AiOutlineDoubleLeft className={className} />
      <span className="sr-only">{alt || "left"}</span>
    </div>
  )
}

export default CaretDbLeft