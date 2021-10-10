import Link from "next/link"
import { formatAmountForDisplay } from "../../utils/storeFns"

interface Props {
  title: string,
  imgSrc: string,
  itemId: string,
  price: number,
  currency: string,
  className?: string,
}


const ItemSquare = ({ className, imgSrc, itemId, title, currency, price, }: Props) => {
  const itemPrice = formatAmountForDisplay(price, currency)
  return (
    <div className={`${className} w-full`}>
      <Link href={`/store/product/${itemId}`} >
        <a className="block aspect-w-1 aspect-h-1">
          <img className="object-cover w-full" src={imgSrc} alt={title} />
        </a>
      </Link>
      <Link href={`/store/product/${itemId}`} >
        <a className="font-bold leading-normal mt-4 block">{title}</a>
      </Link>
      <p className="font-work mt-2 text-blue-900 text-opacity-70">{itemPrice}</p>
    </div>
  )
}

export default ItemSquare