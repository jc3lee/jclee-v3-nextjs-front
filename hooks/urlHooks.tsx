import { useEffect, useState } from "react"

export function useGetUrl() {
  const [postUrl, setPostUrl] = useState("")
  useEffect(() => {
    if (window) {
      setPostUrl(window.location.href)
    }
  }, [])
  return postUrl
}