import Link from "next/link"
import { PostProps } from "../../sanity/queries"
import { getPathFromSlugAndType } from "../../sanity/tools"
import Cover from "./Cover"
import PublishedDate from "./PublishedDate"
import TagBtn from "./TagBtn"
import Title from "./Title"

interface Props {
  post: PostProps,
  className?: string,
}

const Section4 = ({ className, post, }: Props) => {
  const postHref = getPathFromSlugAndType(post.slug, "post")
  return (
    <div className={`${className} flex lg:flex-col space-x-4 lg:space-x-0`}>
      <div className="flex-1">
        <Link href={postHref}>
          <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
            <Cover className="" mainImageUrl={post.mainImageUrl} title={post.title} />
          </a>
        </Link>
      </div>
      <div className="flex-[2] md:flex-1">
        <div className="flex sm:mt-1 flex-wrap">
          {
            post.tags.map(t => <TagBtn key={t} className="text-xs mr-2" tag={t} />)
          }
        </div>
        <Link href={postHref}>
          <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
            <Title title={post.title} className="text-base mt-1" />
            <PublishedDate className="text-sm text-gray-500 mt-2" publishedAt={post.publishedAt} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Section4