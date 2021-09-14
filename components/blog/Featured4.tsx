import { PostProps } from "../../sanity/queries"
import { getPathFromSlugAndType } from "../../sanity/tools"
import CatBtn from "./CatBtn"
import Cover from "./Cover"
import DividerH from "./DividerH"
import PublishedDate from "./PublishedDate"
import Title from "./Title"
import Link from "next/link"

interface Props {
  post: PostProps,
  className?: string,
}

const Featured4 = ({ className, post, }: Props) => {
  const postHref = getPathFromSlugAndType(post.slug, "post")
  return (
    <div className={className}>
      <Link href={postHref}>
        <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
          <Cover className="mt-4" mainImageUrl={post.mainImageUrl} title={post.title} />
        </a>
      </Link>
      <CatBtn className="text-sm " category={post.category} />
      <Link href={postHref}>
        <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
          <Title title={post.title} className="text-base mt-1" />
        </a>
      </Link>
      <PublishedDate className="text-sm text-gray-800 mt-2" publishedAt={post.publishedAt} />
    </div>
  )
}

export default Featured4