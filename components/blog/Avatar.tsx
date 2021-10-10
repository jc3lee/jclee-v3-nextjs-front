import { getImageUrlWithTransformation } from "../../sanity/tools"
import { IoPersonCircleSharp } from "react-icons/io5"

interface Props {
  name: string,
  className?: string,
  imageUrl?: string,
}

const Avatar = ({ name, className, imageUrl }: Props) => {
  const alt = `Photo of ${name}`

  if (imageUrl)
    return (
      <img className={`${className} mx-auto object-cover rounded-full`} src={getImageUrlWithTransformation(imageUrl, { width: 400, height: 400 })} alt={alt} />
    )
  return <IoPersonCircleSharp className={`${className} mx-auto rounded-full`} />
}

export default Avatar