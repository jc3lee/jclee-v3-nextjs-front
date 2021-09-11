// /slug &&  /slug/page/3 => [...author].tsx
// ../blog/authors/[...author].tsx 
// ../blog/authors/author && ../blog/authors/author/page/2

export const getNextPathsSlugAndPageNum = (pathParams: string | string[] | undefined): [string, number] | null => {
  let slug: string, pageNum: number
  if (!pathParams) return null
  if (typeof pathParams === "string") {
    slug = pathParams
    pageNum = 1
  } else if (pathParams.length === 1) {
    slug = pathParams[0]
    pageNum = 1
  } else {
    const [_slug, page, _pageNum] = pathParams
    if (page !== "page") return null
    const pageNumParsed = Number.parseInt(_pageNum)
    if (Number.isNaN(pageNumParsed)) return null
    slug = _slug
    pageNum = pageNumParsed
  }
  return [slug, pageNum]
}

//  / &&  /page/3 => [[...posts]].tsx 
// ../blog/[[...posts]].tsx 
// ../blog/ && ../blog/page/2

export const getNextPathsPageNum = (pathParams: string | string[] | undefined): number | null => {
  let pageNum: number
  if (!pathParams || typeof pathParams === "string" || pathParams.length === 0) {
    pageNum = 1
  } else {
    const [page, _pageNum] = pathParams
    if (page !== "page") return null
    const pageNumParsed = Number.parseInt(_pageNum)
    if (Number.isNaN(pageNumParsed)) return null
    pageNum = pageNumParsed
  }
  return pageNum
}

//  /slug  => [post].tsx 
// ../blog/posts/[post].tsx 

export const getNextPathsSlug = (pathParams: string | string[] | undefined): string | null => {
  let slug: string
  if (!pathParams) return null
  if (typeof pathParams === "string") {
    slug = pathParams
  } else {
    slug = pathParams[0]
  }
  return slug
}