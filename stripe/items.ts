export type ItemsType = {
  priceId: string,
  quantity: number,
}[]

export const getPriceIdFromItemName = (name: string) => {

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