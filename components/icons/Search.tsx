import { BiSearch } from "react-icons/bi"

interface Props {
  alt?: string,
  className?: string,
}

const Search = ({ alt, className, }: Props) => {
  return (
    <div>
      <BiSearch className={className} />
      <span className="sr-only">{alt || "search"}</span>
    </div>
  )
}

export default Search