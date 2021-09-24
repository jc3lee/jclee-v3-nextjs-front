import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import MainRect from '../../../components/blog/MainRect'
import Newsletter from '../../../components/blog/Newsletter'
import SearchForm from '../../../components/blog/SearchForm'
import LoadingPage from '../../../components/LoadingPage'
import MyLayout from '../../../components/MyLayout'
import { handlePageBtnClick, NUM_POSTS_PER_SEARCH_PAGE, NUM_POSTS_PER_TAG_PAGE } from '../../../sanity/pagination'
import { PostProps, QueryType, sanityFetch } from '../../../sanity/queries'

interface Props {
  posts: PostProps[],
  recentPosts: PostProps[],
  searchIndexNum: number,
  s: string,
  totalItems: number,
}

const Search: NextPage<Props> = ({ posts, totalItems, recentPosts, searchIndexNum, s, }) => {
  if (!posts && !recentPosts) return <LoadingPage />
  const router = useRouter()
  const showPrev = searchIndexNum > 0
  const showNext = searchIndexNum + NUM_POSTS_PER_SEARCH_PAGE < totalItems
  const handlePrevNext = (isNext: boolean) => {
    handlePageBtnClick(isNext, searchIndexNum, totalItems, "search", router, undefined, { s })
  }
  const handleSearch = (s: string) => {
    router.push({
      pathname: "/blog/search",
      query: { s }
    })
  }

  return (
    <MyLayout title={"Search Posts"}>
      <div className="max-w-screen-md mx-auto">
        <SearchForm className="px-4 mt-8" handleSearch={handleSearch} />
        <div className="mt-8 grid grid-cols-1">
          <main className="px-4">
            {!s ? <p className="text-lg">Latest posts</p> : <p>{totalItems} result{totalItems !== 1 && "s"}</p>}
            <div className="flex flex-col divide-y">
              {
                !s && recentPosts.map(p => <MainRect showTagsInsteadOfCat={true} showDescription={true} showReadingTime={true} className="py-8" key={p.slug} post={p} />)
              }
              {
                s && posts.map(p => <MainRect showTagsInsteadOfCat={true} showDescription={true} showReadingTime={true} className="py-8" key={p.slug} post={p} />)
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
  // query search s and searchIndex 
  const { s, searchIndex, } = myQuery
  if (Array.isArray(s)) return {
    notFound: true,
  }
  if (Array.isArray(searchIndex)) {
    return {
      notFound: true,
    }
  }

  let searchIndexNum: number
  if (!searchIndex) {
    searchIndexNum = 0
  } else {
    const parsedIndex = Number.parseInt(searchIndex)
    if (Number.isNaN(parsedIndex)) return {
      notFound: true,
    }
    searchIndexNum = parsedIndex
  }

  // let categories: string[] = []
  // if (!categoryArrayIsh) {
  //   // no cat
  // } else if (typeof categoryArrayIsh === "string") {
  //   categories.push(categoryArrayIsh)
  // } else {
  //   categories = categoryArrayIsh
  // }

  const res: { posts: PostProps[], recentPosts: PostProps[], totalItems: number } = await sanityFetch({
    queryType: QueryType.SearchPosts, searchParams: {
      search: s || "",
      start: searchIndexNum,
      end: searchIndexNum + NUM_POSTS_PER_SEARCH_PAGE,
    }
  })
  // console.log("res", res);
  if (!res) return {
    notFound: true
  }
  return {
    props: {
      posts: res.posts,
      recentPosts: res.recentPosts,
      totalItems: res.totalItems,
      searchIndexNum,
      s: s || "",
    }
  }
}

export default Search