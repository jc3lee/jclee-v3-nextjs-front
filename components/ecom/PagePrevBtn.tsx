import { BsArrowLeft, } from "react-icons/bs"

interface Props {
  currentPageNum: number,
  totalPages: number,
  updateCurrentPageNum: (pageNum: number) => void,
}

const PagePrevBtn = ({ currentPageNum, totalPages, updateCurrentPageNum, }: Props) => {
  const canPrev = currentPageNum > 1
  const handleClick = () => {
    if (!canPrev) return
    updateCurrentPageNum(currentPageNum - 1)
  }
  return (
    <button onClick={handleClick} disabled={!canPrev} className={`py-1.5 px-3 rounded-sm border border-black ${!canPrev ? "cursor-default text-gray-400" : "text-black"} `} >
      <BsArrowLeft aria-hidden={true} className="w-6 h-6" />
      <span className="sr-only">Previous page</span>
    </button>
  )
}

export default PagePrevBtn