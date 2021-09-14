import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import AsidePost from '../../../components/blog/AsidePost'
import MainRect from '../../../components/blog/MainRect'
import Newsletter from '../../../components/blog/Newsletter'
import LoadingPage from '../../../components/LoadingPage'
import MyFooter from '../../../components/MyFooter'
import MyTopNav from '../../../components/MyTopNav'
import { getNextPathsSlug } from '../../../nextjs/tools'
import { handlePageBtnClick, NUM_POSTS_PER_CAT_PAGE, } from '../../../sanity/pagination'
import { PostProps, QueryType, sanityFetch } from '../../../sanity/queries'

interface Props {
  category: {
    slug: string,
    title: string,
  },
  posts: PostProps[],
  mustReadPosts: PostProps[],
  totalItems: number,
  searchIndexNum: number,
  categoryNextSlug: string,
}

const Category: NextPage<Props> = ({ category, categoryNextSlug, posts, mustReadPosts, totalItems, searchIndexNum, }) => {
  if (!posts) return <LoadingPage />
  const router = useRouter()
  const showPrev = searchIndexNum > 0
  const showNext = searchIndexNum + NUM_POSTS_PER_CAT_PAGE < totalItems
  const handlePrevNext = (isNext: boolean) => {
    handlePageBtnClick(isNext, searchIndexNum, totalItems, "category", router)
  }

  return (
    <div className="font-open">
      <MyTopNav />
      <div className="py-8 md:py-12 lg:py-16 border-b">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center capitalize ">{category.title}</h1>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <main className="md:col-span-2 md:border-r pl-4 pr-4 xl:pr-8 mt-10 md:mt-0">
            <div className="flex flex-col divide-y">
              {
                posts.map(p => <MainRect showTagsInsteadOfCat={true} showDescription={true} showReadingTime={true} className="py-8" key={p.slug} post={p} />)
              }
            </div>
            <div className="py-20 flex justify-center space-x-6">
              {showPrev && <button onClick={() => handlePrevNext(false)} className="border border-black rounded-sm px-4 py-1 flex items-center text-sm focus:outline-none">
                <AiOutlineLeft aria-hidden={true} className="w-4 h-4 mt-px" />
                <span className=" capitalize ml-2">prev</span>
              </button>}
              {showNext && <button onClick={() => handlePrevNext(true)} className="border border-black rounded-sm px-4 py-1 flex items-center text-sm focus:outline-none">
                <span className=" capitalize mr-2">next</span>
                <AiOutlineRight aria-hidden={true} className="w-4 h-4 mt-px" />
              </button>}
            </div>
          </main>
          <aside className="xl:pl-8 pl-4 pr-4">
            <div className="mt-8 flex items-center">
              <h2 className="pr-2 font-semibold text-xl">Must Reads</h2>
              <div className="flex-1 border-b"></div>
            </div>
            <div className="divide-y grid grid-cols-1 lg:grid-cols-2 lg:gap-x-8 lg:block">
              {
                mustReadPosts.map(p => <AsidePost className="md:block grid grid-cols-3 gap-x-4" key={p.slug} post={p} />)
              }
            </div>
          </aside>
        </div>
      </div>
      <div className="border-t w-full px-4 ">
        <Newsletter />
      </div>
      <MyFooter />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const _cat = context.params?.category
  // console.log("_cat", _cat);
  const category = getNextPathsSlug(_cat)
  // console.log("category", category);
  if (!category) return {
    notFound: true,
  }
  const myQuery = context.query
  const { searchIndex } = myQuery
  let searchIndexNum: number
  if (!searchIndex) {
    // no index => start at 0
    searchIndexNum = 0
  } else if (typeof searchIndex === "string") {
    const parsedIndex = Number.parseInt(searchIndex)
    if (Number.isNaN(parsedIndex)) return {
      notFound: true,
    }
    searchIndexNum = parsedIndex
  } else {
    // if searchIndex is an arr
    return {
      notFound: true,
    }
  }
  const res: {
    category: {
      slug: string,
      title: string,
    },
    posts: PostProps[],
    mustRead: { posts: PostProps[] },
    totalItems: number,
  } = await sanityFetch({
    queryType: QueryType.CategoryFromSlug, categoryParams: {
      category,
      start: searchIndexNum,
      end: searchIndexNum + NUM_POSTS_PER_CAT_PAGE,
    }
  })
  // console.log("res", res);
  if (!res || !res.posts || res.posts.length === 0) return {
    notFound: true
  }
  return {
    props: {
      category: res.category,
      posts: res.posts,
      mustReadPosts: res.mustRead.posts,
      totalItems: res.totalItems,
      searchIndexNum,
      categoryNextSlug: category,
    }
  }
}

export default Category