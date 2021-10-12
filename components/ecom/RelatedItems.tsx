import { ItemProps } from "../../sanity/queries"
import ItemSquare from "./ItemSquare"

interface Props {
  relatedItems: ItemProps[],
  className?: string,
}

const RelatedItems = ({ className, relatedItems, }: Props) => {
  return (
    <div className={className}>
      <h2 className="uppercase font-bold text-center text-lg tracking-wide">You may also like</h2>
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-8">
        {
          relatedItems.map(item => <ItemSquare key={`related-${item.itemId}`} item={item} />)
        }
      </div>
    </div>
  )
}

export default RelatedItems