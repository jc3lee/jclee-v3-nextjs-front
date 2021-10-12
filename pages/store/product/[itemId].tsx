import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from "next/link"
import { useContext } from 'react'
import { BsArrowLeft } from "react-icons/bs"
import ItemDesc from '../../../components/ecom/ItemDesc'
import ItemGallery from '../../../components/ecom/ItemGallery'
import RelatedItems from '../../../components/ecom/RelatedItems'
import CheckoutSuccessDialog from '../../../components/ecom/CSDialog'
import MyStoreLayout from '../../../components/layout/MyStoreLayout'
import { useItemCheckoutConfirm } from '../../../hooks/CheckoutConfirm'
import { StoreContext } from '../../../hooks/StoreContext'
import { getNextPathsSlug } from '../../../nextjs/tools'
import { ItemProps, ItemPropsWithRelated, QueryType, sanityFetch } from '../../../sanity/queries'
import getStripe from '../../../stripe/get-stripejs'
import { getTotalItems } from '../../../utils/storeFns'
import AddedToCartDialog from '../../../components/ecom/ATCDialog'
import { useAddedToCart } from '../../../hooks/AddedToCart'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = getStripe()

interface Props {
  item: ItemPropsWithRelated,
}

const ItemId: NextPage<Props> = ({ item, }) => {
  const { cart, setCart } = useContext(StoreContext) ?? {}
  const numCartItems = getTotalItems(cart)
  const { showConfirmDialog, closeConfirmDialog, setShowConfirmDialog } = useItemCheckoutConfirm()
  const { closeAddedToCartDialog, setShowAddedToCartDialog, showAddedToCartDialog, } = useAddedToCart()
  const handleAddedToCart = () => {
    setShowAddedToCartDialog(true)
  }

  if (!item) return null
  return (
    <MyStoreLayout>
      <div className="px-4 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-12 max-w-screen-lg mx-auto">
          <ItemGallery key={`itemGallery-${item.itemId}`} imgSrcArr={item.images} className="max-w-md md:max-w-full w-full mx-auto" />
          <ItemDesc handleAddedToCart={handleAddedToCart} className="mt-8 md:mt-0" item={item} cart={cart} setCart={setCart} />
        </div>
        <RelatedItems relatedItems={item.relatedItems} className="mt-20" />
        <div className="mt-16 flex justify-center mb-40">
          <Link href="/store">
            <a className="w-80 py-2 max-w-full text-blue-900 border border-blue-800 rounded-sm font-bold flex items-center justify-center">
              <BsArrowLeft aria-hidden={true} className="w-8 h-8 mr-4" />
              <span className="tracking-wider uppercase text-sm">Back to all products</span>
            </a>
          </Link>
        </div>
        <CheckoutSuccessDialog
          showDialog={showConfirmDialog}
          closeDialog={closeConfirmDialog}
        />
        <AddedToCartDialog item={item} qty={1} numCartItems={numCartItems} showDialog={showAddedToCartDialog} closeDialog={closeAddedToCartDialog} />
        {/* <button onClick={() => setShowConfirmDialog(true)}>Show Confirm</button> */}
      </div >
    </MyStoreLayout >
  )
}

export default ItemId

export const getStaticProps: GetStaticProps = async (context) => {
  const _itemId = context.params?.itemId
  const itemId = getNextPathsSlug(_itemId)
  if (!itemId) return {
    notFound: true
  }
  const res: ItemPropsWithRelated = await sanityFetch({ queryType: QueryType.ItemFromItemId, itemId })
  if (!res) return {
    notFound: true
  }
  // console.log("res", res);
  return {
    props: {
      item: res,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: { itemId: string }[] = await sanityFetch({
    queryType: QueryType.AllItemsItemId,
  })
  if (!res || res.length === 0) return {
    paths: [],
    fallback: false,
  }
  // console.log("res", res);
  const paths = res.map(itemObj => ({
    params: {
      itemId: itemObj.itemId,
    }
  }))
  // console.log("paths", paths);
  return {
    paths,
    fallback: true,
  }
}