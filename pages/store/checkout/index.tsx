import type { NextPage } from 'next'
import Link from "next/link"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import CheckoutItemLine from '../../../components/ecom/CheckoutItemLine'
import MyStoreLayout from '../../../components/layout/MyStoreLayout'
import { StoreContext } from '../../../hooks/StoreContext'
import { ItemProps } from '../../../sanity/queries'
import { formatAmountForDisplay, getTotalSum, handleCartCheckout, handleUpdateCart, saveCartToStorage } from '../../../utils/storeFns'

const fetchCartItems = async (cart: {
  itemId: string;
  qty: number;
}[], setSanityItems: Dispatch<SetStateAction<ItemProps[] | undefined>>) => {
  try {
    const itemIds = cart.map(itemObj => itemObj.itemId)
    const fetchData = await fetch("/api/sanity", {
      method: "POST",
      body: JSON.stringify({ itemIds }),
    })
    const res: { success: boolean, data: any } = await fetchData.json()
    const { itemProps }: { itemProps: ItemProps[] } = JSON.parse(res.data || "")
    setSanityItems(itemProps)
  } catch (error: any) {
    console.log(error.message);
  }
}

interface Props { }

const Checkout: NextPage<Props> = () => {
  const { cart, setCart, } = useContext(StoreContext) ?? {}
  const [sanityItems, setSanityItems] = useState<ItemProps[]>()

  useEffect(() => {
    if (cart && cart.length > 0 && !sanityItems) {
      fetchCartItems(cart, setSanityItems)
    }
  }, [cart, sanityItems])

  const updateCart = (itemId: string, qty: number) => {
    const newCart = handleUpdateCart(itemId, qty, cart, setCart)
    if (newCart) saveCartToStorage(newCart)
  }

  let cartWithSanity: {
    item: ItemProps | undefined;
    qty: number;
  }[] | undefined
  if (cart && cart.length > 0 && sanityItems) {
    cartWithSanity = cart.map(itemObj => ({
      item: sanityItems.find(item => item.itemId === itemObj.itemId),
      qty: itemObj.qty,
    }))
  }

  const displayTotal = cartWithSanity ? formatAmountForDisplay(getTotalSum(cartWithSanity), cartWithSanity[0].item?.pricing[0].currency || "USD") : "$0"

  if (!cartWithSanity) {
    return (
      <MyStoreLayout>
        <div className="font-open px-4 max-w-screen-xl mx-auto flex flex-col items-center justify-center min-h-screen">
          <h1 className="-mt-20 sm:-mt-22 lg:-mt-24 text-3xl font-bold">Your cart</h1>
          <p className="mt-6 text-gray-800 tracking-wide">Your cart is currently empty.</p>
          <Link href="/store">
            <a className="px-6 py-3 max-w-full bg-blue-900 text-white rounded-sm font-bold flex mt-6">
              <p className="tracking-wider uppercase text-sm flex flex-wrap justify-center items-center"><span className="text-center mr-1.5">Continue shopping</span><BsArrowRight aria-hidden={true} className="ml-1.5 w-6 h-6" /></p>
            </a>
          </Link>
        </div>
      </MyStoreLayout>
    )
  } else {
    return (
      <MyStoreLayout>
        <div className="font-open px-4 max-w-screen-xl mx-auto flex flex-col items-center min-h-screen">
          <h1 className="mt-16 text-3xl font-bold">Your cart</h1>
          <div className=" mt-6 ">
            <Link href="/store">
              <a className="px-6 py-3 underline">Continue shopping</a>
            </Link>
          </div>
          <div className="mt-16 mb-6 grid grid-cols-4 md:grid-cols-6 w-full">
            <div className="uppercase col-span-3">product</div>
            <div className="uppercase text-right">price</div>
            <div className="uppercase text-right hidden md:block">quantity</div>
            <div className="uppercase text-right hidden md:block">total</div>
          </div>
          {
            cartWithSanity.map(({ item, qty }, index) => <CheckoutItemLine key={index} item={item} qty={qty} updateCart={updateCart} />
            )
          }
          <div className="w-full border-t">
            <div className="flex w-full justify-end mt-8">
              <p>Total:</p>
              <p className="font-work ml-8 mr-1">{displayTotal}</p>
              <p className="font-work">{cartWithSanity[0].item?.pricing[0].currency}</p>
            </div>
            <div className="flex w-full justify-end mt-12 mb-48">
              <button onClick={() => handleCartCheckout(cartWithSanity)} className="w-56 text-center py-3 max-w-full bg-blue-900 text-white rounded-sm font-bold tracking-wider uppercase text-sm">
                checkout
              </button>
            </div>
          </div>
        </div>
      </MyStoreLayout>
    )
  }
}

export default Checkout