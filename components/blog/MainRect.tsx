import { PostProps } from "../../sanity/queries"
import { getPathFromSlugAndType } from "../../sanity/tools"
import CatBtn from "./CatBtn"
import Cover from "./Cover"
import Description from "./Description"
import DividerH from "./DividerH"
import PublishedDate from "./PublishedDate"
import ReadingTime from "./ReadingTIme"
import Title from "./Title"
import Link from "next/link"
import TagBtn from "./TagBtn"

interface Props {
  post: PostProps,
  className?: string,
  showDescription?: boolean,
  showTagsInsteadOfCat?: boolean,
  showReadingTime?: boolean,
}

const MainRect = ({ className, post, showDescription, showReadingTime, showTagsInsteadOfCat, }: Props) => {
  const postHref = getPathFromSlugAndType(post.slug, "post")
  return (
    <div className={`${className} grid grid-cols-1 sm:grid-cols-3 sm:gap-x-4 py-4`}>
      <div>
        <Link href={postHref}>
          <a className="">
            <Cover className="" mainImageUrl={post.mainImageUrl} title={post.title} />
          </a>
        </Link>
      </div>
      <div className="col-span-2">
        {showTagsInsteadOfCat &&
          <div className="flex mt-1 flex-wrap">
            {
              post.tags.map(t => <TagBtn key={t} className="text-xs mr-2" tag={t} />)
            }
          </div>}
        {!showTagsInsteadOfCat && <CatBtn className="text-sm" category={post.category} />}
        <Link href={postHref}>
          <a className="text-base font-semibold mt-1">
            <Title title={post.title} className="text-xl sm:text-2xl mt-1" />
          </a>
        </Link>
        {showDescription && <Description className="mt-2 leading-relaxed" description={post.description} />}
        <div className="text-sm text-gray-800 mt-2 flex">
          <PublishedDate className="" publishedAt={post.publishedAt} />
          {showReadingTime && <span className="mx-2">·</span>}
          {showReadingTime && <ReadingTime readingTime={post.readingTime} />}
        </div>
      </div>
    </div>
  )
}

export default MainRect