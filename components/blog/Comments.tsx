import CommentBlock from "./CommentBlock"
import CommentForm from "./CommentForm"

interface Props {
  comments: {
    name: string,
    text: string,
    _createdAt: string,
  }[],
  _id: string,
  className?: string,
}

const Comments = ({ className, comments, _id }: Props) => {

  return (
    <div className={`${className} w-full`}>
      <div className="flex items-center mb-6">
        <h2 className="pr-2 font-semibold text-xl">Comments</h2>
        <div className="flex-1 border-b"></div>
      </div>
      {
        comments.map((cmt, index) => {
          return <CommentBlock key={index} _createdAt={cmt._createdAt} name={cmt.name} text={cmt.text} isLast={index + 1 === comments.length} />
        })
      }
      {
        comments.length === 0 && <p className="mt-8 text-gray-500 text-sm">Be the first one to comment.</p>
      }
      <div className="flex items-center mt-12">
        <h2 className="pr-2 font-semibold text-xl">Leave a comment</h2>
        <div className="flex-1 border-b"></div>
      </div>
      <CommentForm className="mt-8" _id={_id} />
    </div>
  )
}

export default Comments