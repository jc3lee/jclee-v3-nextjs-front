import { PostProps } from "../../sanity/queries"
import CatBtn from "./CatBtn"
import Cover from "./Cover"
import Description from "./Description"
import DividerH from "./DividerH"
import PublishedDate from "./PublishedDate"
import Title from "./Title"
import Link from "next/link"
import { getPathFromSlugAndType } from "../../sanity/tools"

interface Props {
  post: PostProps,
  className?: string,
}

const SectionCube = ({ className, post, }: Props) => {
  const postHref = getPathFromSlugAndType(post.slug, "post")
  return (
    <div className={`${className} grid grid-cols-1 md:grid-cols-2 md:space-x-4 md:items-center`}>
      <div className="">
        <Link href={postHref}>
          <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150"><Cover className="mb-2 md:mb-0" mainImageUrl={post.mainImageUrl} title={post.title} /></a>
        </Link>
      </div>
      <div className="">
        <CatBtn className="text-sm" category={post.category} />
        <Link href={postHref}><a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
          <Title title={post.title} className="text-2xl mt-2" />
        </a>
        </Link>
        <Description className="mt-1" description={post.description} />
        <PublishedDate className="text-sm text-gray-800 mt-3" publishedAt={post.publishedAt} />
      </div>
    </div>
  )
}

export default SectionCube