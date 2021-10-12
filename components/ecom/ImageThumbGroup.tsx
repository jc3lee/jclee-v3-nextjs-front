// import Swiper core and required modules
import { Navigation, A11y, } from 'swiper';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { getImageUrlWithTransformation } from "../../sanity/tools"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Props {
  gallery: { imageUrl: string }[],
  updateImageZoom: (imgSrc: string) => void,
  className?: string,
}

const ImageThumbGroup = ({ className, gallery, updateImageZoom, }: Props) => {
  // console.log("gallery", gallery);

  return (
    <div className={`${className} flex items-center`}>
      <button className="prevBtn border rounded-md p-2 mr-4">
        <span className="sr-only">Previous</span>
        <AiOutlineLeft aria-hidden={true} className="w-4 h-4" />
      </button>
      <Swiper
        modules={[Navigation, A11y,]}
        threshold={10}
        slidesPerView={4}
        slidesPerGroup={4}
        spaceBetween={0}
        navigation={{
          prevEl: ".prevBtn",
          nextEl: ".nextBtn",
        }}
        className="w-full flex-1 relative"
      >
        {
          gallery.map((img, index) => {
            const transformedImgSrc = getImageUrlWithTransformation(img.imageUrl, { width: 400, })
            return (<SwiperSlide key={index}>
              <div className="aspect-w-1 aspect-h-1">
                <img onClick={() => updateImageZoom(img.imageUrl)} role="button" className="object-cover object-top" src={transformedImgSrc} alt="image" />
              </div>
            </SwiperSlide>)
          })
        }
      </Swiper>
      <button className="nextBtn border rounded-md p-2 ml-4">
        <span className="sr-only">Next</span>
        <AiOutlineRight aria-hidden={true} className="w-4 h-4" />
      </button>
    </div>
  )
}

export default ImageThumbGroup