import Link from "next/link"
import { getPathFromSlugAndType } from "../../sanity/tools"

interface Props {
  author: {
    slug: string,
    name: string,
  },
  className?: string,
}

const AuthorLink = ({ author, className, }: Props) => {
  return (
    <Link key={author.slug} href={getPathFromSlugAndType(author.slug, "author")}>
      <a className={`${className} tracking-normal font-semibold `}>{author.name}</a>
    </Link>
  )
}

export default AuthorLink