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
    <p className={`${className} tracking-normal font-semibold `}>
      <Link key={author.slug} href={getPathFromSlugAndType(author.slug, "author")}>
        <a>{author.name}</a>
      </Link>
    </p>
  )
}

export default AuthorLink