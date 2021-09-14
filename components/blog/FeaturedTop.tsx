import { PostProps } from "../../sanity/queries"
import CatBtn from "./CatBtn"
import Cover from "./Cover"
import Description from "./Description"
import DividerH from "./DividerH"
import PublishedDate from "./PublishedDate"
import Title from "./Title"
import Link from "next/link"
import { getPathFromSlugAndType } from "../../sanity/tools"
import ReadingTime from "./ReadingTIme"

interface Props {
  post: PostProps,
  className?: string,
  showReadingTime?: boolean,
}

const FeaturedTop = ({ className, post, showReadingTime, }: Props) => {
  const postHref = getPathFromSlugAndType(post.slug, "post")
  return (
    <div className={`${className} `}>
      <Link href={postHref}>
        <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150"><Cover className="mb-2" mainImageUrl={post.mainImageUrl} title={post.title} /></a>
      </Link>
      <CatBtn className="text-sm" category={post.category} />
      <Link href={postHref}><a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
        <Title title={post.title} className="text-xl sm:text-2xl lg:text-3xl mt-2" />
      </a>
      </Link>
      <Description className="mt-4 leading-relaxed md:leading-loose" description={post.description} />
      <div className="text-sm text-gray-800 mt-3 flex">
        <PublishedDate className="" publishedAt={post.publishedAt} />
        {showReadingTime && <span className="mx-2">·</span>}
        {showReadingTime && <ReadingTime readingTime={post.readingTime} />}
      </div>
    </div>
  )
}

export default FeaturedTop