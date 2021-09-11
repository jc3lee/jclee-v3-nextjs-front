import { IoPersonCircleSharp } from "react-icons/io5"

interface Props {
  alt: string,
  className?: string,
}

const Person = ({ alt, className, }: Props) => {
  return (
    <div>
      <IoPersonCircleSharp className={className} />
      <span className="sr-only">{alt}</span>
    </div>
  )
}

export default Person