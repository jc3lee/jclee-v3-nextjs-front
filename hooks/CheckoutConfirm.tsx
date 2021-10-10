import { Dispatch, SetStateAction, useEffect, useState } from "react"

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

const checkoutConfirmation = async (id: string, setShowDialog: Dispatch<SetStateAction<boolean>>) => {
  const customerEmail = await fetchSessionEmail(id)
  if (customerEmail) setShowDialog(true)
}

export function useCheckoutConfirm() {
  const [showDialog, setShowDialog] = useState(false)
  const closeDialog = () => {
    setShowDialog(false)
  }
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
    const session_id = query.get('session_id')
    if (query.get('success') && session_id) {
      console.log('Order placed! You will receive an email confirmation.', session_id);
      // 
      checkoutConfirmation(session_id, setShowDialog)
    }
  }, []);

  return {
    showDialog,
    closeDialog,
    //only for debug
    setShowDialog,
  }
}