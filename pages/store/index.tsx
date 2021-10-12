import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import CheckoutSuccessDialog from '../../components/ecom/CSDialog'
import ItemsPagination from '../../components/ecom/ItemsPagination'
import ItemSquare from '../../components/ecom/ItemSquare'
import MyStoreLayout from '../../components/layout/MyStoreLayout'
import { useCartCheckoutConfirm } from '../../hooks/CheckoutConfirm'
import { StoreContext } from '../../hooks/StoreContext'
import { getQueryConstraints, NUM_ITEMS_PER_STORE_PAGE } from '../../sanity/pagination'
import { ItemProps, QueryType, sanityFetch } from '../../sanity/queries'

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
        <div className="pt-16 pb-20 border-b flex justify-center">
          <h1 className="text-3xl font-bold">All my products</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-8">
          {
            items.map((item) => <ItemSquare key={`store-${item.itemId}`} item={item} className="max-w-xs my-8" />)
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