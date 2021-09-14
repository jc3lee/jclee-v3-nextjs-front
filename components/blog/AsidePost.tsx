import Link from "next/link"
import { PostProps } from "../../sanity/queries"
import { getImageUrlWithTransformation, getPathFromSlugAndType } from "../../sanity/tools"
import CatBtn from "./CatBtn"
import PublishedDate from "./PublishedDate"

interface Props {
  post: PostProps,
  className?: string,
}

const AsidePost = ({ post, className, }: Props) => {
  const { mainImageUrl, slug, title, category, publishedAt, } = post
  const postHref = getPathFromSlugAndType(slug, "post")
  return (
    <div className={`${className} py-6`}>
      <div className="w-full">
        <Link href={postHref}>
          <a className="block aspect-w-5 aspect-h-3">
            <img className="object-cover" src={getImageUrlWithTransformation(mainImageUrl, { width: 400 })} alt={title} />
          </a>
        </Link>
      </div>
      <div className="flex flex-col sm:mt-2 col-span-2">
        <CatBtn className="self-start text-sm" category={category} />
        <Link href={postHref}>
          <a className="text-base font-semibold mt-1">{title}</a>
        </Link>
        <PublishedDate publishedAt={publishedAt} className=" py-1 text-xs mt-1 text-gray-500" />
      </div>
    </div>
  )
}

export default AsidePost