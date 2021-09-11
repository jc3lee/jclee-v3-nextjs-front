export const NUM_POSTS_PER_POSTS_PAGE = 3
export const NUM_RECENT_POSTS = 10
export const NUM_RELATED_POSTS = 6
export const NUM_POSTS_PER_AUTHOR_PAGE = 3
export const NUM_POSTS_PER_CATEGORIES_PAGE = 3

export const getQueryConstraints = (numItemsPerPage: number, currentPageNum: number) => {
  const start = (currentPageNum > 0 ? currentPageNum - 1 : currentPageNum) * numItemsPerPage
  const end = start + numItemsPerPage
  return {
    start,
    end,
  }
}