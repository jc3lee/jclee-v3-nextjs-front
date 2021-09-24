/*
27/08
Goal: adding recent posts  & categories navbar on fetch 
How to fetch once for all pages? 
https://github.com/vercel/next.js/discussions/10949
This link shows it's not really possible to fetch once in _app
Once might not be my desired result: if a new post is published I'll need to update recent posts. It's less likely a new category would be created but anyway
Since every blog page needs a fetch already, I decided to add those two parameters to every fetch query that goes to getstaticprops

I'll see if that impacts performance

12/09
"categoriesNav": ${queryCategoriesNav},
got rid of categories fetching => not practical/useful
*/

import { client } from "./client"
import { NUM_RECENT_POSTS, NUM_RELATED_POSTS } from "./pagination"

const NUM_POSTS_PATHS = 10

/* 
Pre-defined categories because not practical to fetch them every time 
& no easy solution to fetch once
*/

export type categoriesSlugType = "webdev" | "design" | "insights"

export interface PostProps {
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
}

const queryPostObj = `{
  category->{
    "slug":slug.current,
    title,		
  },
  description,
  "mainImageUrl": mainImage.asset->url,
  publishedAt,
  readingTime,
  "slug":slug.current,
  tags,
  title,
}
`

const queryAllAuthorsSlug = `
*[_type == "author"] {
  "slug": slug.current,
}
`

const queryAllCategoriesSlug = `
*[_type == "category"] {
  "slug": slug.current,
}
`

const queryAllPostsSlug = `
*[_type == "post"] [0...${NUM_POSTS_PATHS}] {
  "slug": slug.current,
}
`

// only works with post as direct parent
const subQueryRelatedPosts = `
*[_type == "post" && 
_id != ^._id && count((tags[])[@ in ^.^.tags]) > 0][0...${NUM_RELATED_POSTS}] ${queryPostObj}
`

const getQueryRecentPosts = (limits?: { start: number, end: number }) => `
  *[_type == "post"] | order(publishedAt desc) [${limits?.start || 0}...${limits?.end || NUM_RECENT_POSTS}] ${queryPostObj}
`

const queryFeaturedPosts = `
*[_type == "blogSettings"][0]{
  "posts":featuredPosts[]-> ${queryPostObj}
}
`

const queryMustReadPosts = `
*[_type == "blogSettings"][0]{
  "posts":mustReadPosts[]-> ${queryPostObj}
}
`

const queryPostFromSlug = `
{
  "post": *[_type == "post" && slug.current == $post][0]{
  "author":author->{
  	name,		
  	"slug":slug.current,
  },
	body[]{
    ...,
		"imageUrl": image.asset->url,
    markDefs[]{
      ...,
      _type == "internalLink" => {
      	"slugAndType": @.reference->{
          "slug": slug.current,
      		"type": _type,
        }
    	},
    },
  },
  category->{
  	"slug":slug.current,
  	title,		
	},
  "comments": *[_type == "comment" && post._ref == ^._id] | order(_createdAt asc) {
    name,
    text,
    _createdAt,
  },
  description,
  _id,
	"mainImageUrl": mainImage.asset->url,
	publishedAt,
	readingTime,
  "slug":slug.current,
	tags,
  title,
  "relatedPosts": ${subQueryRelatedPosts},
},
}
`

const queryHome = `
{  
  "featured": ${queryFeaturedPosts},
	"cats": *[_type == "category"] {
    "slug": slug.current,
    title,
    "posts": *[_type == "post" && category._ref == ^._id] 
    | order(publishedAt desc) [0...4] ${queryPostObj},
  },
  "recentPosts": ${getQueryRecentPosts()},
}
`

const getQueryAllPosts = (start: number, end: number) => `
  {
    "posts": *[_type == "post"] | order(publishedAt desc) [${start}...${end}] ${queryPostObj},
    "totalItems": count(*[_type == "post"]),
    "mustRead": ${queryMustReadPosts},
  }
`

const getAuthorFromSlugQuery = (start: number, end: number) => `
*[_type == "author" && slug.current == $author][0] {
  bio,
  email,
  "imageUrl": image.asset->url,
  name,
  "slug":slug.current,
  socialAccounts,
  websiteLink,
  "posts": *[_type == "post" && author->slug.current == $author] | order(publishedAt desc) [${start}...${end}] ${queryPostObj},
  "totalItems": count(*[_type == "post" && author->slug.current == $author]),
}
`

const getQueryCategoryFromSlug = (start: number, end: number) => `
  {
    "category": *[_type == "category" && slug.current == $category][0] {
      "slug": slug.current,
      title,
      description,
    },
    "posts": *[_type == "post" && category->slug.current == $category] | order(publishedAt desc) [${start}...${end}] ${queryPostObj},
    "totalItems": count(*[_type == "post" && category->slug.current == $category]),
    "mustRead": ${queryMustReadPosts},
  }
`

const getQueryPostsByTag = (start: number, end: number) => `
  {
    "posts": *[_type == "post" && tags[] match $tag] | order(publishedAt desc) [${start}...${end}] ${queryPostObj},
    "totalItems": count(*[_type == "post" && tags[] match $tag]),
    "mustRead": ${queryMustReadPosts},
  }
`

const getSearchPostsQuery = ({ end, start, authors, categories, order, search, tags, }: SearchPostsType) => {
  // console.log("authors", authors, "categories", categories, "tags", tags,);
  let searchQuery = `*[_type == "post" `
  searchQuery += authors ? ` && author->slug.current in $authors` : ""
  searchQuery += categories ? ` && category->slug.current in $categories` : ""
  searchQuery += search ? ` && (title match $search || tags[] match $search || body[].children[].text match $search)` : ""
  searchQuery += tags ? ` && count((tags[])[@ in $tags]) > 0` : ""
  searchQuery += `]`

  let query = `{`
  query += `"posts": ${searchQuery}`
  query += `| order(${order || "publishedAt desc"}) [${start}...${end}]`
  query += `${queryPostObj},`
  query += `"totalItems": count(${searchQuery}),`
  query += `"recentPosts": ${getQueryRecentPosts({ start, end })},`
  query += `}`
  return query
}

type SearchPostsType = {
  authors?: string[],
  categories?: string[],
  tags?: string[],
  search?: string,
  order?: string,
  start: number,
  end: number,
}

export enum QueryType {
  AllAuthorsSlug,
  AllCategoriesSlug,
  AllPosts,
  AllPostsSlug,
  PostsByTag,
  AuthorFromSlug,
  CategoryFromSlug,
  HomePosts,
  PostFromSlug,
  SearchPosts,
}

type SanityQuery = {
  queryType: QueryType,
  authorParams?: {
    author: string,
    start: number,
    end: number,
  },
  categoryParams?: {
    category: string,
    start: number,
    end: number,
  },
  allPostsParams?: {
    start: number,
    end: number,
  },
  post?: string,
  searchParams?: {
    authors?: string[],
    categories?: string[],
    tags?: string[],
    search?: string,
    order?: string,
    start: number,
    end: number,
  },
  tagParams?: {
    tag: string,
    start: number,
    end: number,
  },
}

export const sanityFetch = async ({ allPostsParams, authorParams, categoryParams, post, queryType, searchParams, tagParams, }: SanityQuery) => {
  switch (queryType) {
    case QueryType.AllAuthorsSlug:
      return await client.fetch(queryAllAuthorsSlug)
    case QueryType.AllCategoriesSlug:
      return await client.fetch(queryAllCategoriesSlug)
    case QueryType.HomePosts:
      return await client.fetch(queryHome)
    case QueryType.AllPostsSlug:
      return await client.fetch(queryAllPostsSlug)
    case QueryType.AllPosts: {
      if (!allPostsParams) return null
      const { end, start, } = allPostsParams
      const queryAllPosts = getQueryAllPosts(start, end)
      return await client.fetch(queryAllPosts,)
    }
    case QueryType.AuthorFromSlug: {
      if (!authorParams) return null
      const { author, end, start, } = authorParams
      const queryAuthorFromSlug = getAuthorFromSlugQuery(start, end)
      return await client.fetch(queryAuthorFromSlug, { author })
    }
    case QueryType.CategoryFromSlug: {
      if (!categoryParams) return null
      const { category, end, start, } = categoryParams
      const queryCategoryFromSlug = getQueryCategoryFromSlug(start, end,)
      return await client.fetch(queryCategoryFromSlug, { category })
    }
    case QueryType.PostsByTag: {
      if (!tagParams) return null
      const { end, start, tag, } = tagParams
      const queryPostsByTag = getQueryPostsByTag(start, end,)
      return await client.fetch(queryPostsByTag, { tag })
    }
    case QueryType.PostFromSlug: {
      if (!post) return null
      return await client.fetch(queryPostFromSlug, { post })
    }
    case QueryType.SearchPosts: {
      if (!searchParams) return null
      const { end, tags, search, order, categories, authors, start, } = searchParams
      const querySearchPosts = getSearchPostsQuery({ start, end, authors, categories, order, search, tags, })
      return await client.fetch(querySearchPosts, {
        authors: authors || [],
        categories: categories || [],
        tags: tags || [],
        search: search || "",
      })
    }
    default:
      throw new Error(`No such query type ${queryType}`);
  }
}