import { Dispatch, SetStateAction, useState } from "react"
import { ItemProps } from "../../sanity/queries"
import { formatAmountForDisplay, handleAddToCart, handleItemCheckout } from "../../utils/storeFns"
import ImageThumbGroup from "./ImageThumbGroup"
import ImageWithZoom from "./ImageWithZoom"

interface Props {
  cart: {
    itemId: string;
    qty: number;
  }[] | undefined,
  setCart: Dispatch<SetStateAction<{
    itemId: string;
    qty: number;
  }[]>> | undefined,
  item: ItemProps,
  className?: string,
}

const ItemDesc = ({ className, item, cart, setCart, }: Props) => {
  const pricing = item.pricing[0]
  const displayPrice = formatAmountForDisplay(pricing.price, pricing.currency)

  return (
    <div className={className}>
      <h1 className="font-bold text-3xl sm:leading-relaxed">{item.title}</h1>
      <p className="text-lg text-blue-900 font-work font-bold">{displayPrice}</p>
      <button onClick={() => handleAddToCart(item.itemId, 1, cart, setCart)} className="text-sm mt-8 uppercase tracking-wider w-96 py-3.5 max-w-full text-blue-900 border border-blue-800 rounded-sm font-bold ">Add to Cart</button>
      <button onClick={() => handleItemCheckout(item.itemId, item.pricing[0].priceId, 1)} className="text-sm mt-4 uppercase tracking-wider w-96 py-3.5 max-w-full bg-blue-900 hover:bg-opacity-90 transition-all duration-100 text-white rounded-sm font-bold ">Buy it Now</button>
      <p className="text-base mt-16">{item.description}</p>
    </div>
  )
}

export default ItemDesc