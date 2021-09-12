/*
27/08
Goal: adding recent posts  & categories navbar on fetch 
How to fetch once for all pages? 
https://github.com/vercel/next.js/discussions/10949
This link shows it's not really possible to fetch once in _app
Once might not be my desired result: if a new post is published I'll need to update recent posts. It's less likely a new category would be created but anyway
Since every blog page needs a fetch already, I decided to add those two parameters to every fetch query that goes to getstaticprops

I'll see if that impacts performance
*/

import { client } from "./client"
import { NUM_RECENT_POSTS, NUM_RELATED_POSTS } from "./pagination"

const NUM_POSTS_PATHS = 10

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
_id != ^._id && count((tags[])[@ in ^.^.tags]) > 0][0...${NUM_RELATED_POSTS}]{
  category->{
  	"slug":slug.current,
  	title,		
	},
  "mainImageUrl": mainImage.asset->url,
	publishedAt,
  "slug":slug.current,
  title,
 }
`

const queryCategoriesNav = `
  *[_type == "category"] | order(publishedAt desc) {
    "slug":slug.current,
    title,
  }
`

const queryRecentPosts = `
  *[_type == "post"] | order(publishedAt desc) [0...${NUM_RECENT_POSTS}]{
    "slug":slug.current,
    title,
  }
`

const getQueryAllPosts = (start: number, end: number) => {
  return `
  {
    "posts": *[_type == "post"] | order(publishedAt desc) [${start}...${end}]{
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
    },
    "totalItems": count(*[_type == "post"]),
    "recentPosts": ${queryRecentPosts},
    "categoriesNav": ${queryCategoriesNav},
  }
`
}

const getAuthorFromSlugQuery = (start: number, end: number) => {
  return `
  {
    "author": *[_type == "author" && slug.current == $author][0] {
    bio,
    email,
    "imageUrl": image.asset->url,
    name,
    "slug":slug.current,
    socialAccounts,
    websiteLink,
    "posts": *[_type == "post" && author->slug.current == $author] | order(publishedAt desc) [${start}...${end}] {
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
    },
    "totalItems": count(*[_type == "post" && author->slug.current == $author]),
  },
  "recentPosts": ${queryRecentPosts},
  "categoriesNav": ${queryCategoriesNav},
}
  `
}

const getQueryCategoryFromSlug = (start: number, end: number) => {
  return `
  {
    "posts": *[_type == "post" && category->slug.current == $category] | order(publishedAt desc) [${start}...${end}]{
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
    },
    "totalItems": 
    count(*[_type == "post" && 
    category->slug.current == $category
  ]),
    "recentPosts": ${queryRecentPosts},
    "categoriesNav": ${queryCategoriesNav},
  }
`
}

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

const getSearchPostsQuery = ({ end, start, authors, categories, order, search, tags, }: SearchPostsType) => {
  let query = `{ "search": *[_type == "post" `
  query += authors ? ` && author->slug.current in $authors` : ""
  query += categories ? ` && category->slug.current in $categories` : ""
  query += search ? ` && (title match $search || body[].children[].text match $search)` : ""
  query += tags ? ` && count((tags[])[@ in $tags]) > 0` : ""
  query += `]`
  query += `| order(${order || "publishedAt desc"})`
  const limits = `[${start}...${end}]`
  query += limits
  query += `
  {
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
  },
  `
  query += `
  "recentPosts": ${queryRecentPosts},
  "categoriesNav": ${queryCategoriesNav},
}
  `
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
  AuthorFromSlug,
  CategoryFromSlug,
  PostFromSlug,
  RecentPosts,
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
  }
}

export const sanityFetch = async ({ allPostsParams, authorParams, categoryParams, post, queryType, searchParams, }: SanityQuery) => {
  switch (queryType) {
    case QueryType.AllAuthorsSlug:
      return await client.fetch(queryAllAuthorsSlug)
    case QueryType.AllCategoriesSlug:
      return await client.fetch(queryAllCategoriesSlug)
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
    case QueryType.PostFromSlug: {
      if (!post) return null
      return await client.fetch(queryPostFromSlug, { post })
    }
    case QueryType.RecentPosts: {
      return await client.fetch(queryRecentPosts,)
    }
    case QueryType.SearchPosts: {
      if (!searchParams) return null
      const { end, tags, search, order, categories, authors, start, } = searchParams
      const querySearchPosts = getSearchPostsQuery({ start, end, authors, categories, order, search, tags, })
      return await client.fetch(querySearchPosts, {
        authors,
        categories,
        search,
        tags,
      })
    }
    default:
      throw new Error(`No such query type ${queryType}`);
  }
}