import { PostProps } from "../../sanity/queries"
import CatBtn from "./CatBtn"
import Cover from "./Cover"
import DividerH from "./DividerH"
import PublishedDate from "./PublishedDate"
import Title from "./Title"

interface Props {
  post: PostProps,
  className?: string,
}

const FeaturedRect = ({ className, post, }: Props) => {
  return (
    <div className={`${className} grid grid-cols-3 gap-x-4 py-4`}>
      <div>
        <Cover className="" mainImageUrl={post.mainImageUrl} title={post.title} />
      </div>
      <div className="col-span-2">
        <CatBtn className="text-sm " category={post.category} />
        <Title title={post.title} className="text-base mt-1" />
        <PublishedDate className="text-sm text-gray-800 mt-2" publishedAt={post.publishedAt} />
      </div>
    </div>
  )
}

export default FeaturedRect