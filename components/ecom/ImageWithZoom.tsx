import { MouseEvent, useRef } from "react"
import { getCursorPosition } from "../../utils/cursorFns"

const RATIO = 2

interface Props {
  imgAlt?: string,
  imgSrc?: string,
  className?: string,
}

const ImageWithZoom = ({ imgSrc = "https://avatarfiles.alphacoders.com/699/thumb-1920-69905.png", imgAlt = "item" }: Props) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const zoomRef = useRef<HTMLImageElement>(null)

  const imageZoom = (e: MouseEvent<HTMLDivElement>) => {
    if (zoomRef.current && imgRef.current) {
      const { x, y, } = getCursorPosition(e, imgRef.current)
      zoomRef.current.style.transform = `translateX(-${x}px) translateY(-${y}px) scale(${RATIO})`
    }
  }
  const initZoom = () => {
    if (zoomRef.current) {
      zoomRef.current.classList.remove("hidden")
    }
  }
  const stopZoom = () => {
    if (zoomRef.current) {
      zoomRef.current.classList.add("hidden")
    }
  }

  return (
    <div onMouseEnter={initZoom} onMouseLeave={stopZoom} onMouseMove={imageZoom} className="mx-auto aspect-w-1 aspect-h-1 relative">
      <img ref={imgRef} className="w-full h-full object-cover bg-white" src={imgSrc} alt="item" />
      <div className="hidden md:block mx-auto aspect-w-1 aspect-h-1 absolute inset-0 overflow-hidden">
        <img ref={zoomRef} className="hidden w-full h-full object-cover origin-top-left bg-white" src={imgSrc} alt={imgAlt} />
      </div>
    </div>
  )
}

export default ImageWithZoom