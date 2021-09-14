import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import DividerH from '../../components/blog/DividerH'
import DividerV from '../../components/blog/DividerV'
import Featured4 from '../../components/blog/Featured4'
import FeaturedTop from '../../components/blog/FeaturedTop'
import FeaturedRect from '../../components/blog/FeatureRect'
import Newsletter from '../../components/blog/Newsletter'
import Section3 from '../../components/blog/Section3'
import Section4 from '../../components/blog/Section4'
import SectionCube from '../../components/blog/SectionCube'
import SectionSnake from '../../components/blog/SectionSnake'
import LoadingPage from '../../components/LoadingPage'
import MyFooter from '../../components/MyFooter'
import MyTopNav from '../../components/MyTopNav'
import { categoriesSlugType, PostProps, QueryType, sanityFetch } from '../../sanity/queries'
import { getPathFromSlugAndType } from '../../sanity/tools'

interface CatHomeProps {
  slug: categoriesSlugType,
  title: string,
  posts: PostProps[],
}

interface Props {
  featured: {
    posts: PostProps[],
  },
  cats: CatHomeProps[],
  recentPosts: PostProps[],
}

const getCatProps = (cats: CatHomeProps[], slug: categoriesSlugType) => {
  return cats.filter(cat => cat.slug === slug)[0]
}

const getFeatured5 = (posts: PostProps[], fbPosts: PostProps[])
  : [PostProps, PostProps[]] => {
  //get topPost
  const topPost = posts.length > 0 ? posts[0] : fbPosts[0]
  //get 4 other featured posts
  const feat4 = posts.length >= 5 ? posts.slice(1, 5) : fbPosts.slice(1, 5)
  return [topPost, feat4]
}

const Posts: NextPage<Props> = ({ cats, featured, recentPosts, }) => {
  if (!featured || !recentPosts || !cats) return <LoadingPage />
  const [featuredTop, featured4] = getFeatured5(featured.posts, recentPosts)
  const webdevCatProps = getCatProps(cats, "webdev")
  const webdevPosts = webdevCatProps.posts

  return (
    <div className="font-open ">
      <MyTopNav />
      <div className="max-w-screen-xl mx-auto">
        <div className="grid md:grid-cols-3 lg:grid-cols-4">
          <div className="md:col-span-2 border-r">
            <FeaturedTop post={featuredTop} className="pt-4 px-4" />
            <div className="lg:hidden px-4 mt-8">
              <div><DividerH className="w-full" /></div>
              <FeaturedRect className="flex-1" post={featured4[0]} />
              <div><DividerH className="w-full" /></div>
              <FeaturedRect className="flex-1" post={featured4[1]} />
              <div className="block md:hidden">
                <div><DividerH className="w-full" /></div>
                <FeaturedRect className="flex-1" post={featured4[2]} />
                <div><DividerH className="w-full" /></div>
                <FeaturedRect className="flex-1" post={featured4[3]} />
              </div>
            </div>
          </div>
          <div className="hidden md:block lg:col-span-2 px-4">
            <div className="flex">
              <Featured4 className="flex-1 mb-8 hidden lg:block" post={featured4[0]} />
              <div><DividerV className="h-full mx-4 hidden lg:block" /></div>
              <Featured4 className="flex-1 mb-8" post={featured4[2]} />
            </div>
            <div className="flex lg:space-x-8">
              <DividerH className="w-full flex-1" />
              <DividerH className="w-full flex-1" />
            </div>
            <div className="flex">
              <Featured4 className="flex-1 mb-8 hidden lg:block" post={featured4[1]} />
              <div><DividerV className="h-full mx-4 hidden lg:block" /></div>
              <Featured4 className="flex-1 mb-8" post={featured4[3]} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 max-w-screen-xl mx-auto border-t-2 border-blue-700 w-full px-4 ">
        <Link href={getPathFromSlugAndType(webdevCatProps.slug, "category")}>
          <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
            <h2 className="font-semibold text-2xl md:text-3xl mt-4">Web Development</h2>
          </a>
        </Link>
        <div className="flex mt-5 pb-4 flex-col lg:flex-row ">
          <div className="flex flex-1 flex-col md:flex-row">
            <div className="flex-1 flex flex-col">
              <Section4 className="flex-1" post={webdevPosts[0]} />
              <div><DividerH className="w-full my-4 hidden md:block lg:hidden" /></div>
            </div>
            <div><DividerV className="h-full mx-4 hidden md:block" /></div>
            <div className="flex-1 flex flex-col">
              <div><DividerH className="w-full my-4 md:hidden" /></div>
              <Section4 className="flex-1" post={webdevPosts[1]} />
              <div><DividerH className="w-full my-4 hidden md:block lg:hidden" /></div>
            </div>
          </div>
          <div><DividerV className="h-full mx-4 hidden lg:block" /></div>
          <div className="flex flex-1 flex-col md:flex-row">
            <div><DividerH className="w-full my-4 md:hidden" /></div>
            <Section4 className="flex-1" post={webdevPosts[2]} />
            <div><DividerV className="h-full mx-4 hidden md:block" /></div>
            <div><DividerH className="w-full my-4 md:hidden" /></div>
            <Section4 className="flex-1" post={webdevPosts[3]} />
          </div>
        </div>
      </div>
      <div className="mt-4 max-w-screen-xl mx-auto border-t-2 border-blue-700 w-full px-4 ">
        <Link href={getPathFromSlugAndType(webdevCatProps.slug, "category")}>
          <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
            <h2 className="font-semibold text-2xl md:text-3xl mt-4">Design</h2>
          </a>
        </Link>
        <div className="flex mt-5 pb-4 flex-col md:flex-row ">
          <Section3 className="flex-1" post={webdevPosts[0]} />
          <div><DividerH className="w-full my-4 md:hidden" /></div>
          <div><DividerV className="h-full mx-4 hidden md:block" /></div>
          <Section3 className="flex-1" post={webdevPosts[1]} />
          <div><DividerH className="w-full my-4 md:hidden" /></div>
          <div><DividerV className="h-full mx-4 hidden md:block" /></div>
          <Section3 className="flex-1" post={webdevPosts[2]} />
        </div>
      </div>
      <div className="mt-4 max-w-screen-xl mx-auto border-t-2 border-blue-700 w-full px-4 ">
        <Link href={getPathFromSlugAndType(webdevCatProps.slug, "category")}>
          <a className="focus:outline-none focus:opacity-80 hover:opacity-80 transition-opacity duration-150">
            <h2 className="font-semibold text-2xl md:text-3xl mt-4">Insights</h2>
          </a>
        </Link>
        <SectionCube className="flex-1 mt-5 pb-4" post={webdevPosts[0]} />
        <div className="flex flex-col md:flex-row py-4 border-t">
          <SectionSnake className="flex-1" post={webdevPosts[1]} />
          <div><DividerV className="h-full mx-4 hidden md:block" /></div>
          <div><DividerH className="w-full my-4 md:hidden" /></div>
          <SectionSnake className="flex-1" post={webdevPosts[2]} />
          <div><DividerV className="h-full mx-4 hidden md:block" /></div>
          <div><DividerH className="w-full my-4 md:hidden" /></div>
          <SectionSnake className="flex-1" post={webdevPosts[3]} />
        </div>
      </div>
      <div className="border-t w-full px-4 ">
        <Newsletter />
      </div>
      <MyFooter />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res: { featured: any, cats: any, recentPosts: any } = await sanityFetch({ queryType: QueryType.HomePosts, })
  if (!res) return {
    notFound: true
  }
  // console.log("res", res);

  return {
    props: {
      featured: res.featured,
      cats: res.cats,
      recentPosts: res.recentPosts,
    }
  }
}

export default Posts