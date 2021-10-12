export const getImageUrlWithTransformation = (imageUrl: string, params: {
  height?: number,
  width?: number,
}) => {
  const tfArr: string[] = []
  const { height, width, } = params
  if (height) {
    tfArr.push(`h=${height}`)
  }
  if (width) {
    tfArr.push(`w=${width}`)
  }
  tfArr.push("fit=fill")
  return `${imageUrl}?${tfArr.join("&")}`
}

export type SanityTypes = "author" | "category" | "post" | "tags"

export const getPathFromSlugAndType = (slug: string, type: SanityTypes) => {
  switch (type) {
    case "author":
      return `/blog/author/${slug}`
    case "category":
      return `/blog/category/${slug}`
    case "post":
      return `/blog/post/${slug}`
    case "tags":
      return `/blog/tag?t=${slug}`
    default:
      throw new Error(`No such slug type ${type}`);
  }
}
