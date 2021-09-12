import { getImageUrlWithTransformation } from "../../../sanity/tools"

interface Props {
  alt: string,
  imageUrl: string,
  size: string,
}

const Figure = ({ alt, imageUrl, size, }: Props) => {
  let sizeClass = ""
  // console.log("size", size);

  switch (size) {
    case "M":
      sizeClass = "w-2/3"
      break;
    case "S":
      sizeClass = "w-1/3"
      break;
    default:
      sizeClass = "w-full"
      break;
  }

  return (
    <div className="mt-6">
      <img className={`${sizeClass} object-cover rounded-sm mx-auto`} src={getImageUrlWithTransformation(imageUrl, { width: 800, })} alt={alt} />
    </div>
  )
}

export default Figure