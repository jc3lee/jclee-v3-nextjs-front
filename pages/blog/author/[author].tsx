import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import AsidePost from '../../../components/blog/AsidePost'
import AuthorLink from '../../../components/blog/AuthorLink'
import AuthorSocials from '../../../components/blog/AuthorSocial'
import BlockContent from '../../../components/blog/BlockContent'
import FeaturedTop from '../../../components/blog/FeaturedTop'
import FeaturedRect from '../../../components/blog/FeatureRect'
import MainRect from '../../../components/blog/MainRect'
import Newsletter from '../../../components/blog/Newsletter'
import LoadingPage from '../../../components/LoadingPage'
import MyFooter from '../../../components/MyFooter'
import MyTopNav from '../../../components/MyTopNav'
import { getNextPathsSlug } from '../../../nextjs/tools'
import { handlePageBtnClick, NUM_POSTS_PER_AUTHOR_PAGE, NUM_POSTS_PER_LATEST_PAGE } from '../../../sanity/pagination'
import { PostProps, QueryType, sanityFetch } from '../../../sanity/queries'
import { getImageUrlWithTransformation } from '../../../sanity/tools'

interface Props {
  posts: PostProps[],
  bio: string,
  email: string,
  imageUrl: string,
  name: string,
  slug: string,
  socialAccounts: any,
  websiteLink: string,
  totalItems: number,
  searchIndexNum: number,
  author: string,
}

const Author: NextPage<Props> = ({ author, bio, email, totalItems, imageUrl, name, posts, searchIndexNum, slug, socialAccounts, websiteLink, }) => {
  if (!posts) return <LoadingPage />
  const router = useRouter()
  const showPrev = searchIndexNum > 0
  const showNext = searchIndexNum + NUM_POSTS_PER_AUTHOR_PAGE < totalItems
  const handlePrevNext = (isNext: boolean) => {
    handlePageBtnClick(isNext, searchIndexNum, totalItems, "author", router)
  }

  return (
    <div className="font-open">
      <MyTopNav />
      <div className="py-8 md:py-12 lg:py-16 border-b">
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center ">Posts by {name}</h1>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <main className="row-start-2 md:row-start-auto md:col-span-2 md:border-r pl-4 pr-4 xl:pr-8 border-t md:border-t-0 mt-10 md:mt-0">
            <div className="flex flex-col divide-y">
              {
                posts.map(p => <MainRect showDescription={true} showReadingTime={true} className="py-8" key={p.slug} post={p} />)
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
          <aside className="pt-8 xl:pl-8 pl-4 pr-4 flex flex-col items-center">
            <img className="w-24 h-24 rounded-full object-cover" src={getImageUrlWithTransformation(imageUrl, { width: 400, })} alt={name} />
            <AuthorLink className="mt-2" author={{ slug, name }} />
            <div className="text-gray-500 text-center -mt-6">
              <BlockContent blocks={bio} />
            </div>
            <AuthorSocials email={email} socialAccounts={socialAccounts} />
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
  const _author = context.params?.author
  // console.log("_author", _author);
  const author = getNextPathsSlug(_author)
  // console.log("author", author);
  if (!author) return {
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
    posts: PostProps[],
    bio: string,
    email: string,
    imageUrl: string,
    name: string,
    slug: string,
    socialAccounts: any,
    websiteLink: string,
    totalItems: number,
  } = await sanityFetch({
    queryType: QueryType.AuthorFromSlug, authorParams: {
      author,
      start: searchIndexNum,
      end: searchIndexNum + NUM_POSTS_PER_AUTHOR_PAGE,
    }
  })
  // console.log("res", res);
  if (!res || !res.posts || res.posts.length === 0) return {
    notFound: true
  }
  // console.log("res", res);

  return {
    props: {
      posts: res.posts,
      bio: res.bio,
      email: res.email,
      imageUrl: res.imageUrl,
      name: res.name,
      slug: res.slug,
      socialAccounts: res.socialAccounts,
      websiteLink: res.websiteLink,
      totalItems: res.totalItems,
      searchIndexNum,
      author,
    }
  }
}

export default Author