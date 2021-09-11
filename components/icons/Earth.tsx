import { ImEarth } from "react-icons/im"

interface Props {
  alt: string,
  className?: string,
}

const Earth = ({ alt, className, }: Props) => {
  return (
    <div>
      <ImEarth className={className} />
      <span className="sr-only">{alt}</span>
    </div>
  )
}

export default Earth