import { getDateStringWithTimeFromISO, } from "../../utils/dateFns"

interface Props {
  name: string,
  _createdAt: string,
  text: string,
  isLast: boolean,
}

const CommentBlock = ({ _createdAt, name, text, isLast, }: Props) => {
  return (
    <>
      <p className="mt-3 font-semibold">{name}</p>
      <p className="text-sm text-gray-400 tracking-tight">{getDateStringWithTimeFromISO(_createdAt)}</p>
      <p className="mt-2">{text}</p>
      {!isLast && <div className="w-full mt-6 border-b"></div>}
    </>
  )
}

export default CommentBlock