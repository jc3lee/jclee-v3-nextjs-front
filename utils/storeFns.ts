import { cloneDeep } from "lodash"
import { Dispatch, SetStateAction } from "react"
import { ItemProps } from "../sanity/queries"

export const deleteCartFromStorage = () => {
  if (window && window.localStorage) {
    window.localStorage.removeItem("cart")
  }
}

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

export const handleUpdateCart = (itemId: string, qty: number,
  cart: {
    itemId: string;
    qty: number;
  }[] | undefined,
  setCart: Dispatch<SetStateAction<{
    itemId: string;
    qty: number;
  }[]>> | undefined) => {
  if (cart && cart.length > 0 && setCart) {
    let finalCart
    if (qty === 0) {
      //remove that item from cart
      finalCart = cart.filter(item => item.itemId !== itemId)
    } else {
      // clone to not update cart directly
      finalCart = cloneDeep(cart)
      const clonedCartItem = finalCart.find(clonedItem => clonedItem.itemId === itemId)
      if (!clonedCartItem) return
      clonedCartItem.qty = qty
    }
    // update cart
    setCart(finalCart)
    // return new Cart
    return finalCart
  }
}

export const handleResetCart = (setCart: Dispatch<SetStateAction<{
  itemId: string;
  qty: number;
}[]>> | undefined) => {
  if (setCart) {
    setCart([])
  }
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
    // return new Cart
    return finalCart
  }
}

export const handleItemCheckout = async (itemId: string, priceId: string, quantity: number) => {
  const res = await fetch("/api/checkout-sessions", {
    method: "POST",
    body: JSON.stringify({ items: [{ priceId, quantity }], pathname: `/store/product/${itemId}` })
  })
  const { error, errorMessage, redirectUrl, } = await res.json()
  // console.log("error", error, "errorMessage", errorMessage, "redirectUrl", redirectUrl);
  if (window && redirectUrl) {
    window.location.href = redirectUrl
  }
}

export const handleCartCheckout = async (cartWithSanity?: {
  item: ItemProps | undefined;
  qty: number;
}[]) => {
  if (!cartWithSanity || cartWithSanity.length === 0) return
  const items = cartWithSanity.reduce<{ priceId: string, quantity: number }[]>((tempItems, b) => {
    if (b.item) {
      tempItems.push({ priceId: b.item.pricing[0].priceId, quantity: b.qty })
    }
    return tempItems
  }, [])
  const res = await fetch("/api/checkout-sessions", {
    method: "POST",
    body: JSON.stringify({ items, pathname: `/store` })
  })
  const { error, errorMessage, redirectUrl, } = await res.json()
  // console.log("error", error, "errorMessage", errorMessage, "redirectUrl", redirectUrl);
  if (window && redirectUrl) {
    window.location.href = redirectUrl
  }
}

export const getTotalItems = (cart?: { itemId: string, qty: number }[]) => {
  if (!cart) return 0
  else {
    const totalItems = cart.reduce((tempTotalQty, b) => {
      return tempTotalQty + b.qty
    }, 0)
    return totalItems
  }
}

export const getTotalSum = (cartWithSanity: {
  item: ItemProps | undefined;
  qty: number;
}[]) => {
  if (!cartWithSanity) return 0
  else {
    const totalSum = cartWithSanity.reduce((tempTotalSum, b) => {
      if (!b.item) return tempTotalSum
      return tempTotalSum + (b.item.pricing[0].price * b.qty)
    }, 0)
    return totalSum
  }
}