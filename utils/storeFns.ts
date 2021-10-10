import { cloneDeep } from "lodash"
import { Dispatch, SetStateAction } from "react"

export const getCartFromStorage = () => {
  if (window && window.localStorage) {
    const cart: { itemId: string, qty: number }[] = JSON.parse(window.localStorage.getItem("cart") ?? "[]")
    return cart
  } else {
    return []
  }
}

export const saveCartToStorage = (cart: { itemId: string, qty: number }[]) => {
  if (window && window.localStorage) {
    window.localStorage.setItem("cart", JSON.stringify(cart))
  }
}

export const formatAmountForDisplay = (
  amount: number,
  currency: string
): string => {
  let numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  })
  return numberFormat.format((amount / 100))
}

export const handleAddToCart = (
  itemId: string,
  qty: number,
  cart: {
    itemId: string;
    qty: number;
  }[] | undefined,
  setCart: Dispatch<SetStateAction<{
    itemId: string;
    qty: number;
  }[]>> | undefined) => {
  if (cart && setCart) {
    // clone
    const tempCart = cloneDeep(cart)
    const foundItemObj = tempCart.find(itemObj => itemObj.itemId === itemId)
    let finalCart
    if (foundItemObj) {
      foundItemObj.qty += qty
      finalCart = [...tempCart,]
    } else {
      finalCart = [...tempCart, { itemId, qty }]
    }
    // update cart
    setCart(finalCart)
    // save to storage
    saveCartToStorage(finalCart)
  }
}

export const handleItemCheckout = async (itemId: string, priceId: string, quantity: number) => {
  const res = await fetch("/api/checkout-sessions", {
    method: "POST",
    body: JSON.stringify({ items: [{ priceId, quantity }], pathname: `/store/product/${itemId}` })
  })
  const { error, errorMessage, redirectUrl, } = await res.json()
  console.log("error", error, "errorMessage", errorMessage, "redirectUrl", redirectUrl);
  if (window && redirectUrl) {
    window.location.href = redirectUrl
  }
}