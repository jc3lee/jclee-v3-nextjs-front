
export const getFacebookShareLink = (url: string, title: string) => {
  return encodeURI(`https://www.facebook.com/sharer.php?u=${url}&t=${title}`)
}

export const getLinkedinShareLink = (url: string, title: string) => {
  return encodeURI(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
}
export const getTwitterShareLink = (url: string, title: string) => {
  return encodeURI(`https://twitter.com/intent/tweet/?text=${title}&url=${url}`)
}

export const getMailShareLink = (url: string, title: string) => {
  return `mailto:?subject=${title}&body=${url}`
}