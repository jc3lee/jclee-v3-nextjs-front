import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from "next/link"
import { useContext } from 'react'
import { BsArrowLeft } from "react-icons/bs"
import ItemGallery from '../../../components/ecom/ItemGallery'
import MyStoreLayout from '../../../components/layout/MyStoreLayout'
import { StoreContext } from '../../../hooks/StoreContext'
import { getNextPathsSlug } from '../../../nextjs/tools'
import { ItemProps, QueryType, sanityFetch } from '../../../sanity/queries'
import { formatAmountForDisplay, saveCartToStorage } from '../../../stripe/items'
import cloneDeep from "lodash/cloneDeep"
import getStripe from '../../../stripe/get-stripejs'
import { useRouter } from 'next/router'

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = getStripe()

interface Props {
  item: ItemProps,
}

const ItemId: NextPage<Props> = ({ item, }) => {
  const { cart, setCart } = useContext(StoreContext) ?? {}
  const router = useRouter()
  console.log("p", router.pathname);


  const handleItemCheckout = async (itemId: string, priceId: string, quantity: number) => {
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

  const handleAddToCart = (itemId: string, qty: number) => {
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

  // console.log("item", item);
  const pricing = item.pricing[0]
  const displayPrice = formatAmountForDisplay(pricing.price, pricing.currency)

  return (
    <MyStoreLayout>
      <div className="px-4 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-12 max-w-screen-lg mx-auto">
          <div className="max-w-md md:max-w-full w-full mx-auto">
            <ItemGallery imgSrcArr={item.images} className="" />
          </div>
          <div className="mt-8 md:mt-0">
            <h1 className="font-bold text-3xl sm:leading-relaxed">{item.title}</h1>
            <p className="text-lg text-blue-900 font-work font-bold">{displayPrice}</p>
            <button onClick={() => handleAddToCart(item.itemId, 1)} className="text-sm mt-8 uppercase tracking-wider w-96 py-3.5 max-w-full text-blue-900 border border-blue-800 rounded-sm font-bold ">Add to Cart</button>
            <button onClick={() => handleItemCheckout(item.itemId, item.pricing[0].priceId, 1)} className="text-sm mt-4 uppercase tracking-wider w-96 py-3.5 max-w-full bg-blue-900 hover:bg-opacity-90 transition-all duration-100 text-white rounded-sm font-bold ">Buy it Now</button>
            <p className="text-base mt-16">{item.description}</p>
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <h2 className="uppercase font-bold">You may also like</h2>
          <div className="grid grid-cols-4">
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
        </div>
        <div className="mt-16 flex justify-center mb-40">
          <Link href="/store">
            <a className="w-80 py-2 max-w-full text-blue-900 border border-blue-800 rounded-sm font-bold flex items-center justify-center">
              <BsArrowLeft aria-hidden={true} className="w-8 h-8 mr-4" />
              <span className="tracking-wider uppercase text-sm">Back to all products</span>
            </a>
          </Link>
        </div>
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
  const res: ItemProps = await sanityFetch({ queryType: QueryType.ItemFromItemId, itemId })
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