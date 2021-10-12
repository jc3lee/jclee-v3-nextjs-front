import { Dispatch, SetStateAction } from "react"
import { client } from "./client"
import { NUM_RECENT_POSTS, NUM_RELATED_ITEMS, NUM_RELATED_POSTS } from "./pagination"

// num of posts and items pages pre-build
const NUM_POSTS_PATHS = 10
const NUM_ITEMS_PATHS = 8

/* 
Pre-defined categories because not practical to fetch them every time 
& no easy solution to fetch once
*/

export type categoriesSlugType = "webdev" | "design" | "insights"

export interface ItemProps {
  description: string,
  images: {
    imageUrl: string,
  }[],
  itemId: string,
  pricing: {
    price: number,
    priceId: string,
    currency: string,
  }[],
  tags: string[],
  title: string,
}
export interface ItemPropsWithRelated {
  description: string,
  images: {
    imageUrl: string,
  }[],
  itemId: string,
  pricing: {
    price: number,
    priceId: string,
    currency: string,
  }[],
  relatedItems: ItemProps[],
  tags: string[],
  title: string,
}

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

const queryItemObj = `{
  description,
  images[]{
    "imageUrl": asset->url,
  },
  itemId,
  pricing[]{
    price,
    priceId,
    currency,
  },
  tags,
  title,
}`

// only works with post as direct parent
const subQueryRelatedPosts = `
*[_type == "post" && 
_id != ^._id && count((tags[])[@ in ^.^.tags]) > 0][0...${NUM_RELATED_POSTS}] ${queryPostObj}
`

// only works with item as direct parent
const subQueryRelatedItems = `
*[_type == "item" && 
_id != ^._id && count((tags[])[@ in ^.^.tags]) > 0][0...${NUM_RELATED_ITEMS}] ${queryItemObj}
`

const queryItemObjWithRelated = `{
  description,
  images[]{
    "imageUrl": asset->url,
  },
  itemId,
  pricing[]{
    price,
    priceId,
    currency,
  },
  "relatedItems": ${subQueryRelatedItems},
  tags,
  title,
}`

const queryItemsFromItemIds = `
*[_type == "item" && itemId in $itemIds] ${queryItemObj}
`

const getQueryAllItems = (start: number, end: number) => `
{
  "items": *[_type == "item"] [${start}...${end}]${queryItemObj},
  "totalItems": count(*[_type == "item"])
}
`

const queryItemFromItemId = `
*[_type == "item" && itemId == $itemId][0]${queryItemObjWithRelated}
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

const queryAllItemsItemId = `
*[_type == "item"] [0...${NUM_ITEMS_PATHS}] {
  itemId,
}
`

const queryAllItemsCount = `
count(*[_type == "item"])
`

const queryAllPostsSlug = `
*[_type == "post"] [0...${NUM_POSTS_PATHS}] {
  "slug": slug.current,
}
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
  AllItems,
  AllItemsCount,
  AllItemsItemId,
  AllPosts,
  AllPostsSlug,
  PostsByTag,
  AuthorFromSlug,
  CategoryFromSlug,
  HomePosts,
  ItemFromItemId,
  ItemsFromItemIds,
  PostFromSlug,
  SearchPosts,
}

export type SanityQuery = {
  queryType: QueryType,
  allPostsParams?: {
    start: number,
    end: number,
  },
  allItemsParams?: {
    start: number,
    end: number,
  },
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
  itemId?: string,
  itemIds?: string[],
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

export const sanityFetch = async ({ allItemsParams, allPostsParams, authorParams, categoryParams, itemId, itemIds, post, queryType, searchParams, tagParams, }: SanityQuery) => {
  switch (queryType) {
    case QueryType.AllAuthorsSlug:
      return await client.fetch(queryAllAuthorsSlug)
    case QueryType.AllCategoriesSlug:
      return await client.fetch(queryAllCategoriesSlug)
    case QueryType.AllItems: {
      if (!allItemsParams) return null
      const { end, start, } = allItemsParams
      const queryAllItems = getQueryAllItems(start, end)
      return await client.fetch(queryAllItems,)
    }
    case QueryType.AllItemsCount: {
      return await client.fetch(queryAllItemsCount)
    }
    case QueryType.AllItemsItemId:
      return await client.fetch(queryAllItemsItemId)
    case QueryType.ItemFromItemId: {
      if (!itemId) return null
      return await client.fetch(queryItemFromItemId, { itemId })
    }
    case QueryType.ItemsFromItemIds: {
      if (!itemIds || itemIds.length === 0) return null
      return await client.fetch(queryItemsFromItemIds, { itemIds })
    }
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

export const fetchCartItems = async (cart: {
  itemId: string;
  qty: number;
}[], setSanityItems: Dispatch<SetStateAction<ItemProps[] | undefined>>) => {
  try {
    const itemIds = cart.map(itemObj => itemObj.itemId)
    const fetchData = await fetch("/api/sanity", {
      method: "POST",
      body: JSON.stringify({ itemIds }),
    })
    const res: { success: boolean, data: any } = await fetchData.json()
    const { itemProps }: { itemProps: ItemProps[] } = JSON.parse(res.data || "")
    setSanityItems(itemProps)
  } catch (error: any) {
    console.log(error.message);
  }
}