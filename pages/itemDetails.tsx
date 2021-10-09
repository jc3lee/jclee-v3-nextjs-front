import type { NextPage } from 'next';
import { useState } from 'react';
import ImageThumbGroup from '../components/ImageThumbGroup';
import ImageWithZoom from '../components/ImageWithZoom';
import MyMainLayout from '../components/MyMainLayout';

const gallery = [
  { imageUrl: "https://avatarfiles.alphacoders.com/699/thumb-1920-69905.png", },
  { imageUrl: "https://avatarfiles.alphacoders.com/873/thumb-1920-87367.png", },
  { imageUrl: "https://avatarfiles.alphacoders.com/709/thumb-1920-70914.png", },
  { imageUrl: "https://avatarfiles.alphacoders.com/457/thumb-1920-45744.png", },
  { imageUrl: "https://avatarfiles.alphacoders.com/740/thumb-1920-74085.png", },
  { imageUrl: "https://avatarfiles.alphacoders.com/854/thumb-1920-85469.png", },
  { imageUrl: "https://avatarfiles.alphacoders.com/822/thumb-1920-82242.png", },
]

const gallery1 = [
  { imageUrl: "/images/card0.png", },
  { imageUrl: "/images/ux-design.png", },
  { imageUrl: "/images/ui-design.png", },
  { imageUrl: "/images/privacy.png", },
  { imageUrl: "/images/resp-design.png", },
  { imageUrl: "/images/tou.png", },
  { imageUrl: "/images/404.png", },
  { imageUrl: "/images/seo.png", },
]

const ItemDetails: NextPage = () => {
  const [currentImgSrc, setCurrentImgSrc] = useState(gallery[0].imageUrl)
  const handleThumbClick = (e: any) => {
    setCurrentImgSrc((e.currentTarget as HTMLImageElement).src)
  }

  return (
    <MyMainLayout>
      <ImageWithZoom imgSrc={currentImgSrc} />
      <ImageThumbGroup className="my-4" gallery={gallery} updateImageZoom={handleThumbClick} />
      <div className=""></div>
    </MyMainLayout>
  )
}

export default ItemDetails