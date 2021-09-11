import { getImageUrlWithTransformation } from "../../sanity/tools"

interface Props {
  mainImageUrl: string,
  title: string,
  className?: string,
}

const Cover = ({ className, mainImageUrl, title, }: Props) => {
  return (
    <div className={`${className} aspect-w-3 aspect-h-2`}>
      <img className="object-cover" src={getImageUrlWithTransformation(mainImageUrl, { width: 1000, })} alt={title} />
    </div>
  )
}

export default Cover