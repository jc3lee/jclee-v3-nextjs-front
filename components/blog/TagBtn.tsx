import Link from "next/link"
import { getPathFromSlugAndType } from "../../sanity/tools"

interface Props {
  tag: string,
  className?: string,
}

const TagBtn = ({ tag, className, }: Props) => {
  return (
    <Link key={tag} href={getPathFromSlugAndType(tag, "tags")}>
      <a className={`${className} text-blue-700 font-semibold bg-white uppercase`}>#{tag}</a>
    </Link>
  )
}

export default TagBtn