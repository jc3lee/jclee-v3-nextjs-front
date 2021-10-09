import Link from 'next/link'
import { useContext } from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai"
import DividerV from '../components/blog/DividerV'
import { StoreContext } from '../hooks/StoreContext'

const getTotalItems = (cart?: { itemId: string, qty: number }[]) => {
  if (!cart) return 0
  else return cart.reduce((tempTotalQty, b) => {
    return tempTotalQty + b.qty
  }, 0)
}

const MyStoreTopNav = () => {
  const { cart, setCart } = useContext(StoreContext) ?? {}
  const numItems = getTotalItems(cart)
  console.log("numItems", numItems);

  return (
    <div className="mb-20 sm:mb-22 lg:mb-24">
      <div className="fixed top-0 z-40 inset-x-0 border-b">
        <nav className="relative bg-white px-4 max-w-screen-xl mx-auto py-3 lg:py-5">
          <div className="w-full flex items-center relative z-50">
            <div className="flex items-center">
              <Link href="/#"><a className="focus:outline-none leading-none text-2xl lg:text-3xl mr-4">JC LEE</a></Link>
              <DividerV className="h-6 border-gray-400" />
              <span className="ml-4 text-gray-800 text-sm">Store</span>
            </div>
            <div className="flex-1"></div>
            <div className="text-sm capitalize flex items-center flex-wrap font-semibold tracking-tight">
              <Link href="/store/checkout"><a className={`mr-3 md:mr-4 py-0.5 flex items-center`}>
                <span className="hidden sm:inline tracking-wide">Shopping Cart</span>
                <div className="relative">
                  <AiOutlineShoppingCart aria-hidden={true} className="ml-2 w-8 h-8" />
                  <div className={`${numItems === 0 && "hidden"} absolute -top-1.5 -right-1.5 text-xs text-white bg-blue-800 rounded-full w-5 h-5 flex justify-center items-center`}>{numItems}</div>
                </div>
              </a></Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default MyStoreTopNav