import Link from "next/link"
import { formatAmountForDisplay } from "../../utils/storeFns"
import { getImageUrlWithTransformation } from "../../sanity/tools"
import { ItemProps } from "../../sanity/queries"

interface Props {
  item: ItemProps,
  className?: string,
}

const ItemSquare = ({ className, item, }: Props) => {
  const { price, currency } = item.pricing[0]
  const itemPrice = formatAmountForDisplay(price, currency)
  const transformedImgSrc = getImageUrlWithTransformation(item.images[0].imageUrl, { width: 600, })
  return (
    <div className={`${className} w-full`}>
      <Link href={`/store/product/${item.itemId}`} >
        <a className="block aspect-w-1 aspect-h-1">
          <img className="object-cover object-top w-full" src={transformedImgSrc} alt={item.title} />
        </a>
      </Link>
      <Link href={`/store/product/${item.itemId}`} >
        <a className="font-bold leading-normal mt-4 block">{item.title}</a>
      </Link>
      <p className="font-work text-gray-900 text-opacity-70 font-bold">{itemPrice}</p>
    </div>
  )
}

export default ItemSquare