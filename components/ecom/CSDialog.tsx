import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai"
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

interface Props {
  showDialog: boolean,
  closeDialog: () => void,
}

const CheckoutSuccessDialog = ({ showDialog, closeDialog, }: Props) => {
  // const csRef = useRef<HTMLDivElement>(null)
  // const q = gsap.utils.selector(csRef)
  let tl: gsap.core.Timeline | undefined

  const getTimeline = () => {
    const tl = gsap.timeline()
    tl.to(".confirmOverlay", { opacity: 1, duration: 0.3 }, "together")
    tl.to(".confirmBox", { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3" }, "together")
    // tl.to(q(".confirmOverlay"), { opacity: 1, duration: 0.3 }, "together")
    // tl.to(q(".confirmBox"), { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3" }, "together")
    return tl
  }

  useEffect(() => {
    const confirmOverlay = document.querySelector(".confirmOverlay")
    const confirmBox = document.querySelector(".confirmBox")
    if (confirmOverlay && confirmBox && !tl) {
      tl = getTimeline()
    }
  }, [showDialog, tl])

  const handleHideDialog = () => {
    if (!tl) {
      tl = getTimeline()
    }
    tl.reverse().then(() => {
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
    <div className="fixed z-[999] inset-0 overflow-y-auto ">
      <div onClick={handleHideDialog} className="confirmOverlay fixed z-[1000] inset-0 bg-black bg-opacity-30 opacity-0"></div>
      <div className="confirmBox -translate-y-1/2 opacity-0 shadow-2xl relative z-[1001] mt-12 bg-white rounded max-w-sm mx-auto">
        <button onClick={handleHideDialog}>
          <AiOutlineClose aria-hidden={true} className="w-6 h-6 absolute top-3 right-3" />
          <span className="sr-only">close</span>
        </button>
        <div className="bg-gray-50 mt-12 relative py-6 px-10">
          <div className="absolute w-12 h-12 -top-6 left-1/2 -translate-x-6 flex justify-center items-center rounded-full bg-green-500 text-white">
            <AiOutlineCheck aria-hidden={true} className="w-8 h-8" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-center">Order Placed!</h1>
          <div className="mt-6 text-center">
            <p>Thanks for your purchase!</p>
            <p>A confirmation email has been sent to your email address.</p>
          </div>
          <button className="mt-24 w-full border rounded-md py-3 px-4 focus:outline-none bg-green-500 text-white font-bold tracking-wide" onClick={handleHideDialog}>Got it!</button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessDialog