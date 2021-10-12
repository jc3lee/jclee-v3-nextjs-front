import { ItemProps } from "../../sanity/queries"
import { formatAmountForDisplay } from "../../utils/storeFns"
import { useId } from "@reach/auto-id" // hook to generate unique IDs be sure to npm i auto-id
import debounce from "lodash/debounce"
import { ChangeEvent } from "react"

interface Props {
  item: ItemProps,
  qty: number,
  updateCart: (itemId: string, qty: number) => void,
  className?: string,
}

const CheckoutItemLine = ({ item, qty, updateCart }: Props) => {
  const inputId = useId()
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateCart(item.itemId, e.target.valueAsNumber)
  }
  const handleRemove = () => {
    updateCart(item.itemId, 0)
  }
  const displayPrice = formatAmountForDisplay(item.pricing[0].price, item.pricing[0].currency)
  const total = formatAmountForDisplay((item.pricing[0].price) * qty, item.pricing[0].currency)
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 w-full py-6 border-t items-center">
      <div className="col-span-3 flex space-x-4">
        <img className="w-20 h-20 object-cover object-top" src={item.images[0].imageUrl} alt={item.title} />
        <div className="">
          <p className="font-bold text-gray-900">{item.title}</p>
          <button onClick={handleRemove} className="underline text-blue-900 text-sm">Remove</button>
        </div>
      </div>
      <div className="text-right font-work flex flex-col items-end md:block">
        <p className="uppercase">{displayPrice}</p>
        <div className="md:hidden flex justify-end items-center mt-4">
          <label className="flex-1 font-open text-sm mr-2" htmlFor={inputId}>Qty: </label>
          <input min={0} onChange={debounce(handleInputChange, 1000)} type="number" name="numberInput" id={inputId} className="py-1 px-1 text-center w-14 rounded-sm border border-black focus:outline-none focus:ring-2 focus:ring-blue-700" defaultValue={qty} />
        </div>
      </div>
      <div className="hidden md:block uppercase text-right font-work">
        <input min={0} onChange={debounce(handleInputChange, 1000)} type="number" name="numberInput" id={inputId} className="py-1 px-1 text-center w-14 rounded-sm border border-black focus:outline-none focus:ring-2 focus:ring-blue-700" defaultValue={qty} />
      </div>
      <div className="hidden md:block uppercase text-right font-work">{total}</div>
    </div>
  )
}

export default CheckoutItemLine