import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { deleteCartFromStorage, handleResetCart } from "../utils/storeFns";

const fetchSessionEmail = async (id: string) => {
  try {
    const res = await fetch("/api/checkout/session", {
      method: "POST",
      body: JSON.stringify({ id })
    })
    const { error, errorMessage, email } = await res.json()
    console.log("error", error, "errorMessage", errorMessage, "email", email,);
    // show a dialog
    return {
      email,
    }
  } catch (error) {
    console.log("error", error);
    return {
      email: "",
    }
  }
}

const checkoutConfirmation = async (id: string, setShowConfirmDialog: Dispatch<SetStateAction<boolean>>) => {
  // const customerEmail = await fetchSessionEmail(id)
  // if (customerEmail) setShowDialog(true)
  setShowConfirmDialog(true)
}

export function useItemCheckoutConfirm() {
  const counter = useRef(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
  }
  useEffect(() => {
    if (!showConfirmDialog && counter.current === 0) {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
      const session_id = query.get('session_id')
      if (query.get('success') && session_id) {
        setShowConfirmDialog(true)
        counter.current += 1
      }
    }
  }, [showConfirmDialog, counter,]);
  return {
    showConfirmDialog,
    closeConfirmDialog,
    //debug
    setShowConfirmDialog,
  }
}

export function useCartCheckoutConfirm(
  cart: {
    itemId: string;
    qty: number;
  }[] | undefined,
  setCart: Dispatch<SetStateAction<{
    itemId: string;
    qty: number;
  }[]>> | undefined) {
  const counter = useRef(0)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const closeConfirmDialog = () => {
    setShowConfirmDialog(false)
  }
  useEffect(() => {
    if (cart && setCart && !showConfirmDialog && counter.current === 0) {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);
      const session_id = query.get('session_id')
      if (query.get('success') && session_id) {
        setShowConfirmDialog(true)
        // reset cart
        handleResetCart(setCart)
        deleteCartFromStorage()
        counter.current += 1
      }
    }
  }, [showConfirmDialog, counter, cart, setCart]);
  return {
    showConfirmDialog,
    closeConfirmDialog,
  }
}