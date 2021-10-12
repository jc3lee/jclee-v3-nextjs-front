import { useState } from "react"
import ImageThumbGroup from "./ImageThumbGroup"
import ImageWithZoom from "./ImageWithZoom"

interface Props {
  imgSrcArr: {
    imageUrl: string,
  }[],
  className?: string,
}

const ItemGallery = ({ className, imgSrcArr, }: Props) => {
  const [currentImgSrc, setCurrentImgSrc] = useState(imgSrcArr[0].imageUrl)
  const handleThumbClick = (imgSrc: string) => {
    setCurrentImgSrc(imgSrc)
  }

  return (
    <div className={className}>
      <ImageWithZoom imgSrc={currentImgSrc} />
      <ImageThumbGroup className="my-4" gallery={imgSrcArr} updateImageZoom={handleThumbClick} />
    </div>
  )
}

export default ItemGallery