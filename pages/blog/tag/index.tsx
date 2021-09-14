import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import AsidePost from '../../../components/blog/AsidePost'
import MainRect from '../../../components/blog/MainRect'
import Newsletter from '../../../components/blog/Newsletter'
import LoadingPage from '../../../components/LoadingPage'
import MyFooter from '../../../components/MyFooter'
import MyTopNav from '../../../components/MyTopNav'
import { handlePageBtnClick, NUM_POSTS_PER_TAG_PAGE } from '../../../sanity/pagination'
import { PostProps, QueryType, sanityFetch } from '../../../sanity/queries'

interface Props {
  posts: PostProps[],
  mustReadPosts: PostProps[],
  searchIndexNum: number,
  tag: string,
  totalItems: number,
}


const Tag: NextPage<Props> = ({ posts, mustReadPosts, totalItems, searchIndexNum, tag, }) => {
  if (!posts) return <LoadingPage />
  const router = useRouter()
  const showPrev = searchIndexNum > 0
  const showNext = searchIndexNum + NUM_POSTS_PER_TAG_PAGE < totalItems
  const handlePrevNext = (isNext: boolean) => {
    handlePageBtnClick(isNext, searchIndexNum, totalItems, "tag", router)
  }

  return (
    <div className="font-open">
      <MyTopNav />
      <div className="py-8 md:py-12 lg:py-16 border-b">
        <h1 className="text-xl md:text-2xl lg:text-3xl text-center uppercase ">#{tag}</h1>
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
  const myQuery = context.query
  // query tag t and searchIndex s
  const { t, searchIndex, } = myQuery
  let searchIndexNum: number
  if (!t || Array.isArray(t) || Array.isArray(searchIndex)) return {
    notFound: true,
  }
  if (!searchIndex) {
    searchIndexNum = 0
  } else {
    const parsedIndex = Number.parseInt(searchIndex)
    if (Number.isNaN(parsedIndex)) return {
      notFound: true,
    }
    searchIndexNum = parsedIndex
  }

  const res: { posts: any, recentPosts: any, mustRead: any, totalItems: number } = await sanityFetch({
    queryType: QueryType.PostsByTag, tagParams: {
      tag: t,
      start: searchIndexNum,
      end: searchIndexNum + NUM_POSTS_PER_TAG_PAGE,
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
      tag: t,
    }
  }
}

export default Tag