import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useRef, useState } from 'react'
import CheckoutSuccessDialog from '../../components/ecom/CSDialog'
import ItemsPagination from '../../components/ecom/ItemsPagination'
import ItemSquare from '../../components/ecom/ItemSquare'
import MyStoreLayout from '../../components/layout/MyStoreLayout'
import { useCartCheckoutConfirm, useCheckoutConfirm } from '../../hooks/CheckoutConfirm'
import { StoreContext } from '../../hooks/StoreContext'
import { getQueryConstraints, NUM_ITEMS_PER_STORE_PAGE } from '../../sanity/pagination'
import { ItemProps, QueryType, sanityFetch } from '../../sanity/queries'
import { deleteCartFromStorage, handleResetCart, saveCartToStorage } from '../../utils/storeFns'

interface Props {
  items: ItemProps[],
  pageNum: number,
  totalItems: number,
}

const Store: NextPage<Props> = ({ items, pageNum, totalItems, }) => {
  const router = useRouter()
  const { cart, setCart } = useContext(StoreContext) ?? {}
  const { closeConfirmDialog, showConfirmDialog, } = useCartCheckoutConfirm(cart, setCart)

  const handlePageSwitch = (pageNum: number) => {
    router.push({
      pathname: "/store",
      query: { page: pageNum }
    })
  }

  return (
    <MyStoreLayout>
      <div className="font-rale px-4 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-8">
          {
            items.map(({ images, itemId, pricing, title, }, index) => <ItemSquare key={index} currency={pricing[0].currency} imgSrc={images[0].imageUrl} itemId={itemId} price={pricing[0].price} title={title} className="max-w-xs" />)
          }
        </div>
        <ItemsPagination className="mt-12 mb-16" numItemsPerPage={NUM_ITEMS_PER_STORE_PAGE} pageNum={pageNum} totalItems={totalItems} updateCurrentPageNum={handlePageSwitch} />
      </div>
      <CheckoutSuccessDialog
        showDialog={showConfirmDialog}
        closeDialog={closeConfirmDialog}
      />
    </MyStoreLayout>
  )
}

export default Store

export const getServerSideProps: GetServerSideProps = async (context) => {
  const myQuery = context.query
  const { page, } = myQuery
  let pageNum: number
  if (Array.isArray(page)) return {
    notFound: true,
  }
  if (!page) {
    pageNum = 1
  } else {
    const parsedPageNum = Number.parseInt(page)
    if (Number.isNaN(parsedPageNum)) return {
      notFound: true,
    }
    pageNum = parsedPageNum
  }

  const res: {
    items: ItemProps[],
    totalItems: number,
  } = await sanityFetch({
    queryType: QueryType.AllItems, allItemsParams: {
      ...getQueryConstraints(NUM_ITEMS_PER_STORE_PAGE, pageNum)
    }
  })
  if (!res || !res.items || res.items.length < 1) return {
    notFound: true
  }
  // console.log("res", res);

  return {
    props: {
      items: res.items,
      pageNum,
      totalItems: res.totalItems,
    }
  }
}