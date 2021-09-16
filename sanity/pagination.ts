import { NextRouter } from "next/dist/client/router"

export const NUM_POSTS_PER_POST_PAGE = 4
export const NUM_POSTS_PER_LATEST_PAGE = 4
export const NUM_POSTS_PER_CAT_PAGE = 4
export const NUM_POSTS_PER_TAG_PAGE = 4
export const NUM_POSTS_PER_SEARCH_PAGE = 4
export const NUM_POSTS_PER_AUTHOR_PAGE = 4
export const NUM_RECENT_POSTS = 10
export const NUM_RELATED_POSTS = 6

export const getQueryConstraints = (numItemsPerPage: number, currentPageNum: number) => {
  const start = (currentPageNum > 0 ? currentPageNum - 1 : currentPageNum) * numItemsPerPage
  const end = start + numItemsPerPage
  return {
    start,
    end,
  }
}

type SubPathType = "latest" | "tag" | "author" | "category" | "search"

export const handlePageBtnClick = (isNext: boolean, searchIndexNum: number, totalItems: number, subPath: SubPathType, router: NextRouter, subPathSlug?: string, additionalQueries?: any) => {
  let numPostPerPage: number

  switch (subPath) {
    case "author":
      numPostPerPage = NUM_POSTS_PER_AUTHOR_PAGE
      break;
    case "category":
      numPostPerPage = NUM_POSTS_PER_CAT_PAGE
      break;
    case "latest":
      numPostPerPage = NUM_POSTS_PER_LATEST_PAGE
      break;
    case "search":
      numPostPerPage = NUM_POSTS_PER_SEARCH_PAGE
      break;
    case "tag":
      numPostPerPage = NUM_POSTS_PER_TAG_PAGE
      break;
    default:
      throw new Error("No such sub path");
  }

  let newSearchIndex: number
  if (isNext) {
    console.log("search index totalItems", searchIndexNum, totalItems);
    if (searchIndexNum + numPostPerPage < totalItems) {
      newSearchIndex = searchIndexNum + numPostPerPage
    } else return
  } else {
    if (searchIndexNum > 0) {
      newSearchIndex = searchIndexNum > numPostPerPage ? searchIndexNum - numPostPerPage : 0
    } else return
  }
  let routerQuery
  if (additionalQueries && typeof additionalQueries === "object") {
    routerQuery = {
      ...additionalQueries,
      searchIndex: newSearchIndex,
    }
  } else {
    routerQuery = {
      searchIndex: newSearchIndex,
    }
  }
  router.push({
    pathname: `/blog/${subPath}${subPathSlug ? `/${subPathSlug}` : ""}`,
    query: routerQuery,
  })
}