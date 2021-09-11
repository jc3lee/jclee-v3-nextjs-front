import type { NextPage } from 'next'
import { GetStaticPaths, GetStaticProps } from 'next'
import AsidePost from '../../../components/blog/AsidePost'
import AuthorLink from '../../../components/blog/AuthorLink'
import BlockContent from '../../../components/blog/BlockContent'
import Comments from '../../../components/blog/Comments'
import Cover from '../../../components/blog/Cover'
import Description from '../../../components/blog/Description'
import Newsletter from '../../../components/blog/Newsletter'
import PostLeftAside from '../../../components/blog/PostLeftAside'
import PublishedDate from '../../../components/blog/PublishedDate'
import ReadingTime from '../../../components/blog/ReadingTIme'
import TagBar from '../../../components/blog/TagBar'
import Title from '../../../components/blog/Title'
import LoadingPage from '../../../components/LoadingPage'
import MyFooter from '../../../components/MyFooter'
import MyTopNav from '../../../components/MyTopNav'
import { useGetUrl } from '../../../hooks/urlHooks'
import { getNextPathsSlug } from '../../../nextjs/tools'
import { QueryType, sanityFetch } from '../../../sanity/queries'

interface Props {
  post: {
    author: {
      name: string,
      slug: string,
    },
    body: any,
    category: {
      slug: string,
      title: string,
    },
    description: string,
    mainImageUrl: string,
    publishedAt: string,
    readingTime: string,
    slug: string,
    tags: string[],
    title: string,
    relatedPosts: {
      category: {
        slug: string,
        title: string,
      },
      mainImageUrl: string,
      publishedAt: string,
      slug: string,
      title: string,
    }[],
  },
  recentPosts: {
    slug: string,
    title: string,
  }[],
  categoriesNav: {
    slug: string,
    title: string,
  }[],
}

const Post: NextPage<Props> = ({ post, categoriesNav, recentPosts, }) => {
  if (!post) return <LoadingPage />
  const postUrl = useGetUrl()

  return (
    <div className="font-open ">
      <MyTopNav />
      <div className="mt-4 sm:mt-10 max-w-screen-xl mx-auto">
        <TagBar tags={post.tags} className="px-4 sm:px-0" />
        <Title title={post.title} className="mt-6 sm:mt-12 px-4 sm:px-0" />
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 ">
          <main className="lg:col-span-2 border-r lg:pr-8 pb-32">
            <Description description={post.description} className="px-4 sm:px-0" />
            <div className="px-4 sm:px-0 flex flex-col sm:flex-row sm:items-center text-gray-500 mt-4 text-sm sm:text-base">
              <p>
                <span className="text-gray-700 font-semibold">By</span>
                <AuthorLink className="ml-2 sm:mr-2 text-gray-700" author={post.author} />
                <span className="hidden sm:inline-block">|</span>
              </p>
              <p className="flex items-center mt-1 sm:mt-0">
                <PublishedDate className="sm:ml-2 mr-2" publishedAt={post.publishedAt} />
                <span>|</span>
                <ReadingTime className="ml-2" readingTime={post.readingTime} />
              </p>
            </div>
            <Cover className="mt-2" mainImageUrl={post.mainImageUrl} title={post.title} />
            <div className="relative pl-4 md:pl-24 lg:pl-24 pr-4 md:pr-24 lg:pr-8">
              <div className="absolute top-2 left-8 hidden md:block">
                <PostLeftAside url={postUrl} title={post.title} />
              </div>
              <div className="">
                <BlockContent blocks={post.body} />
                <Comments className="mt-28" comments={[]} />
              </div>
            </div>
          </main>
          <aside className="lg:pl-8 px-4 lg:px-0">
            <div className="flex items-center">
              <h2 className="pr-2 font-semibold text-xl">Related Posts</h2>
              <div className="flex-1 border-b"></div>
            </div>
            <div className="divide-y sm:divide-y-0 lg:divide-y grid grid-cols-1 sm:grid-cols-2 sm:gap-x-8 lg:block">
              {
                post.relatedPosts.map(rp => <AsidePost key={rp.slug} category={rp.category} imageUrl={rp.mainImageUrl} publishedAt={rp.publishedAt} slug={rp.slug} title={rp.title} />)
              }
            </div>
          </aside>
        </div>
        <div className="border-t w-full px-4 sm:px-0">
          <Newsletter />
        </div>
      </div>
      <MyFooter />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const _post = context.params?.post
  const post = getNextPathsSlug(_post)
  if (!post) return {
    notFound: true
  }
  const res: { post: any, recentPosts: any, categoriesNav: any } = await sanityFetch({ queryType: QueryType.PostFromSlug, post })
  if (!res || !res.post) return {
    notFound: true
  }
  console.log("res", res);

  return {
    props: {
      post: res.post,
      recentPosts: res.recentPosts,
      categoriesNav: res.categoriesNav,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res: { slug: string, }[] = await sanityFetch({ queryType: QueryType.AllPostsSlug, })
  if (!res || res.length === 0) return {
    paths: [],
    fallback: false,
  }
  const paths = res.map(slugObj => ({
    params: {
      post: slugObj.slug,
    }
  }))
  console.log("paths", paths);
  return {
    paths,
    fallback: true,
  }
}

export default Post