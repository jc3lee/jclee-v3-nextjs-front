import { getImageUrlWithTransformation } from "../../../sanity/tools"

interface Props {
  alt: string,
  imageUrl: string,
  size: string,
}

const Figure = ({ alt, imageUrl, size, }: Props) => {
  let sizeClass = ""
  console.log("size", size);

  switch (size) {
    case "Medium":
      sizeClass = "w-2/3"
      break;
    case "Small":
      sizeClass = "w-1/3"
      break;
    default:
      sizeClass = "w-full"
      break;
  }

  return (
    <div className={`${sizeClass} mt-6 mx-auto`}>
      <img className={`object-cover rounded-sm shadow`} src={getImageUrlWithTransformation(imageUrl, { width: 800, })} alt={alt} />
    </div>
  )
}

export default Figure