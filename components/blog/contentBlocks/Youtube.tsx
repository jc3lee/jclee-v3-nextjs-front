import getYoutubeId from "get-youtube-id"

interface Props {
  url: string,
}

const Youtube = ({ url }: Props) => {
  if (!url) return null
  const id = getYoutubeId(url)
  const src = `https://www.youtube.com/embed/${id}`
  return (
    <div className="aspect-w-16 aspect-h-9 mt-6">
      <iframe className="w-full h-full" src={src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen;"></iframe>
    </div>
  )
}

export default Youtube