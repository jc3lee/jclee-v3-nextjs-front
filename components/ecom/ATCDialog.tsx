import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import { gsap } from 'gsap'
import { useEffect } from 'react'
import { ItemProps } from "../../sanity/queries"
import Link from 'next/link'

interface Props {
  item: ItemProps,
  qty: number,
  numCartItems: number,
  showDialog: boolean,
  closeDialog: () => void,
}

const AddedToCartDialog = ({ showDialog, closeDialog, item, numCartItems, qty, }: Props) => {
  const tl = gsap.timeline()
  useEffect(() => {
    if (showDialog) {
      tl.to(".addedToCartOverlay", { opacity: 1, duration: 0.3 }, "together")
      tl.to(".addedToCartBox", { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3" }, "together")
      //added to cart dialog shows as soon as  btn clicked
      //so I added a little delay
      tl.delay(0.5)
    }
  }, [showDialog])

  const handleHideDialog = () => {
    // animate hiding
    tl.reverse().then(() => {
      //  hide
      closeDialog()
    })
  }

  const closeIfEsc = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    if (key === "escape") handleHideDialog()
  }

  useEffect(() => {
    window.addEventListener("keydown", closeIfEsc)
    return () => window.removeEventListener("keydown", closeIfEsc)
  }, [])

  if (!showDialog) return null
  return (
    <div className="fixed z-[999] inset-0 overflow-y-auto">
      <div onClick={handleHideDialog} className="addedToCartOverlay fixed z-[1000] inset-0 bg-black bg-opacity-0 opacity-0"></div>
      <div className="addedToCartBox -translate-y-1/2 opacity-0 shadow-md absolute z-[1001] right-0 bg-white rounded max-w-[22rem] w-full">
        <div className="bg-white relative px-6 pb-3">
          <div className="flex items-center justify-between py-4">
            <p className="uppercase text-xs">just added to your cart</p>
            <button onClick={handleHideDialog}>
              <AiOutlineClose aria-hidden={true} className="w-6 h-6" />
              <span className="sr-only">close</span>
            </button>
          </div>
          <div className="border-b w-full"></div>
          <div className="flex space-x-4 mt-4">
            <div className="w-16 h-16">
              <img src={item.images[0].imageUrl} alt={item.title} className="w-full h-full object-cover object-top" />
            </div>
            <p className="font-bold flex-1">{item.title}</p>
            <p className="text-sm text-blue-900">Qty: {qty}</p>
          </div>
          <Link href="/store/checkout">
            <a className="block mt-6 w-full border text-center rounded-sm text-sm py-3 px-4 focus:outline-none border-blue-800 text-blue-800 font-bold tracking-wide uppercase" onClick={handleHideDialog}>View Cart ({numCartItems})</a>
          </Link>
          <div className="w-full flex justify-center mt-3">
            <button className="underline focus:outline-none text-blue-900 text-sm" onClick={handleHideDialog}>Continue shopping</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddedToCartDialog