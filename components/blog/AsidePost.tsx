import Link from "next/link"
import { getImageUrlWithTransformation, getPathFromSlugAndType } from "../../sanity/tools"
import CatBtn from "./CatBtn"
import PublishedDate from "./PublishedDate"

interface Props {
  publishedAt: string,
  title: string,
  slug: string,
  imageUrl: string,
  category: {
    slug: string,
    title: string,
  },
}

const AsidePost = ({ imageUrl, slug, title, category, publishedAt, }: Props) => {
  return (
    <div className="py-6">
      <div className="w-full">
        <Link href={getPathFromSlugAndType(slug, "post")}>
          <a className="block aspect-w-5 aspect-h-3">
            <img className="object-cover" src={getImageUrlWithTransformation(imageUrl, { width: 400 })} alt={title} />
          </a>
        </Link>
      </div>
      <div className="flex flex-col mt-2">
        <CatBtn className="self-start" category={category} />
        <Link href={getPathFromSlugAndType(slug, "post")}>
          <a className="text-base font-semibold mt-1">{title}</a>
        </Link>
        <PublishedDate publishedAt={publishedAt} className="mt-1 text-gray-500" />
      </div>
    </div>
  )
}

export default AsidePost