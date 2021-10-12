import { Dispatch, SetStateAction } from "react"
import { ItemProps } from "../../sanity/queries"
import { formatAmountForDisplay, handleAddToCart, handleItemCheckout, saveCartToStorage } from "../../utils/storeFns"

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
  handleAddedToCart: () => void,
  className?: string,
}

const ItemDesc = ({ className, item, cart, setCart, handleAddedToCart }: Props) => {
  const pricing = item.pricing[0]
  const displayPrice = formatAmountForDisplay(pricing.price, pricing.currency)
  const handleAddToCartBtnClick = () => {
    const newCart = handleAddToCart(item.itemId, 1, cart, setCart)
    if (newCart) saveCartToStorage(newCart)
    handleAddedToCart()
  }

  return (
    <div className={className}>
      <h1 className="font-bold text-2xl sm:text-3xl sm:leading-relaxed">{item.title}</h1>
      <p className="mt-1 text-lg sm:text-xl text-blue-900 font-work font-bold">{displayPrice}</p>
      <button onClick={handleAddToCartBtnClick} className="text-sm mt-8 uppercase tracking-wider w-96 py-3.5 max-w-full text-blue-900 border border-blue-800 rounded-sm font-bold focus:outline-none">Add to Cart</button>
      <button onClick={() => handleItemCheckout(item.itemId, item.pricing[0].priceId, 1)} className="text-sm mt-4 uppercase tracking-wider w-96 py-3.5 max-w-full bg-blue-900 hover:bg-opacity-90 transition-all duration-100 text-white rounded-sm font-bold focus:outline-none">Buy it Now</button>
      <p className="text-base mt-16">{item.description}</p>
    </div>
  )
}

export default ItemDesc