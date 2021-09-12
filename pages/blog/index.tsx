import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import Newsletter from '../../components/blog/Newsletter'
import LoadingPage from '../../components/LoadingPage'
import MyFooter from '../../components/MyFooter'
import MyTopNav from '../../components/MyTopNav'
import { getNextPathsSlug } from '../../nextjs/tools'
import { QueryType, sanityFetch } from '../../sanity/queries'

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
    comments: {
      name: string,
      text: string,
      _createdAt: string,
    }[],
    description: string,
    _id: string,
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

const Posts: NextPage<Props> = ({ post, categoriesNav, recentPosts, }) => {
  if (!post) return <LoadingPage />

  return (
    <div className="font-open ">
      <MyTopNav />
      <div className="border-t w-full px-4 ">
        <Newsletter />
      </div>
      <MyFooter />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res: { post: any, recentPosts: any, categoriesNav: any } = await sanityFetch({ queryType: QueryType.PostFromSlug, post })
  if (!res || !res.post) return {
    notFound: true
  }
  // console.log("res", res);

  return {
    props: {
      post: res.post,
      recentPosts: res.recentPosts,
      categoriesNav: res.categoriesNav,
    }
  }
}

export default Posts