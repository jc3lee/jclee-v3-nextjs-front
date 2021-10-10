import { useState } from "react"

export function useAddedToCart() {
  const [showAddedToCartDialog, setShowAddedToCartDialog] = useState(false)
  const closeAddedToCartDialog = () => {
    setShowAddedToCartDialog(false)
  }

  return {
    showAddedToCartDialog,
    closeAddedToCartDialog,
    //only for debug
    setShowAddedToCartDialog,
  }
}