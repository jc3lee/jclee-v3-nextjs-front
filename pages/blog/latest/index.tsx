import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import AsidePost from '../../../components/blog/AsidePost'
import FeaturedTop from '../../../components/blog/FeaturedTop'
import Newsletter from '../../../components/blog/Newsletter'
import LoadingPage from '../../../components/LoadingPage'
import MyLayout from '../../../components/MyLayout'
import { handlePageBtnClick, NUM_POSTS_PER_LATEST_PAGE } from '../../../sanity/pagination'
import { PostProps, QueryType, sanityFetch } from '../../../sanity/queries'

interface Props {
  posts: PostProps[],
  mustReadPosts: PostProps[],
  totalItems: number,
  searchIndexNum: number,
}

const Latest: NextPage<Props> = ({ posts, mustReadPosts, totalItems, searchIndexNum }) => {
  if (!posts) return <LoadingPage />
  const router = useRouter()
  const showPrev = searchIndexNum > 0
  const showNext = searchIndexNum + NUM_POSTS_PER_LATEST_PAGE < totalItems
  const handlePrevNext = (isNext: boolean) => {
    handlePageBtnClick(isNext, searchIndexNum, totalItems, "latest", router)
  }

  return (
    <MyLayout title={"Latest Blog Posts"}>
      <div className="mt-4 sm:mt-10 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-2 md:border-r pl-4 pr-4 xl:pr-8">
            <main className="flex flex-col divide-y">
              {
                posts.map(p => <FeaturedTop showReadingTime={true} className="py-8" key={p.slug} post={p} />)
              }
            </main>
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
          </div>
          <aside className="xl:pl-8 pl-4 pr-4">
            <div className="flex items-center">
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
    </MyLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
  const res: { posts: any, recentPosts: any, mustRead: any, totalItems: number } = await sanityFetch({
    queryType: QueryType.AllPosts, allPostsParams: {
      start: searchIndexNum, end: searchIndexNum + NUM_POSTS_PER_LATEST_PAGE,
    }
  })
  if (!res || !res.posts || res.posts.length === 0) return {
    notFound: true
  }
  // console.log("res", res);
  return {
    props: {
      posts: res.posts,
      mustReadPosts: res.mustRead.posts,
      totalItems: res.totalItems,
      searchIndexNum,
    }
  }
}

export default Latest