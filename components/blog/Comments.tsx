import { getImageUrlWithTransformation } from "../../sanity/tools"

interface Props {
  comments: string[],
  className?: string,
}

const Comments = ({ className, comments, }: Props) => {
  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center">
        <h2 className="pr-2 font-semibold text-xl">Comments</h2>
        <div className="flex-1 border-b"></div>
      </div>
      {
        JSON.stringify(comments, null, 2)
      }
      <div className="w-full flex justify-center mt-8">
        <button className="bg-blue-700 text-white rounded-sm max-w-md w-full py-2 text-center font-semibold">
          Share your view on this post
        </button>
      </div>
    </div>
  )
}

export default Comments