import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import CheckoutSuccessDialog from '../../components/ecom/CSDialog'
import ItemsPagination from '../../components/ecom/ItemsPagination'
import ItemSquare from '../../components/ecom/ItemSquare'
import LoadingPage from '../../components/layout/LoadingPage'
import MyStoreLayout from '../../components/layout/MyStoreLayout'
import { useCartCheckoutConfirm } from '../../hooks/CheckoutConfirm'
import { StoreContext } from '../../hooks/StoreContext'
import { getNextPathsPageNum } from '../../nextjs/tools'
import { getQueryConstraints, NUM_ITEMS_PER_STORE_PAGE } from '../../sanity/pagination'
import { ItemProps, QueryType, sanityFetch } from '../../sanity/queries'
import { getTotalPages } from '../../utils/paginationFns'

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
    if (pageNum <= 1) {
      router.push({
        pathname: "/store",
      })
    } else {
      router.push({
        pathname: `/store/page/${pageNum}`,
      })
    }
  }

  if (router.isFallback) {
    return <LoadingPage />
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
        <ItemsPagination className="mt-12 mb-32 lg:mb-40" numItemsPerPage={NUM_ITEMS_PER_STORE_PAGE} pageNum={pageNum} totalItems={totalItems} updateCurrentPageNum={handlePageSwitch} />
      </div>
      <CheckoutSuccessDialog
        showDialog={showConfirmDialog}
        closeDialog={closeConfirmDialog}
      />
    </MyStoreLayout>
  )
}

export default Store

// The home page needs to switch from ssr to isr for better seo
/*
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
*/

export const getStaticProps: GetStaticProps = async (context) => {
  const store = context.params?.store
  const pageNum = getNextPathsPageNum(store)
  if (!pageNum) return {
    notFound: true
  }
  const res: {
    items: ItemProps[],
    totalItems: number,
  } = await sanityFetch({
    queryType: QueryType.AllItems, allItemsParams: {
      ...getQueryConstraints(NUM_ITEMS_PER_STORE_PAGE, pageNum)
    }
  })
  if (!res || !res.items || res.items.length === 0) return {
    notFound: true
  }
  // console.log("res", res);
  return {
    props: {
      items: res.items,
      pageNum,
      totalItems: res.totalItems,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: number = await sanityFetch({ queryType: QueryType.AllItemsCount, })
  if (!res || res === 0) return {
    paths: [{ params: { store: [] }, },],
    fallback: false,
  }
  const totalPages = getTotalPages(NUM_ITEMS_PER_STORE_PAGE, res)
  const paths: {
    params: { store: string[] },
  }[] = []
  // add default route with no page num
  paths.push({ params: { store: [] }, })
  // add page num routes
  for (let i = 0; i < totalPages; i++) {
    paths.push({ params: { store: ["page", `${i + 1}`] } })
  }
  // console.log("paths", JSON.stringify(paths));
  return {
    paths,
    fallback: true,
  }
}