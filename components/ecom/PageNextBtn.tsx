import { BsArrowRight, } from "react-icons/bs"

interface Props {
  currentPageNum: number,
  totalPages: number,
  updateCurrentPageNum: (pageNum: number) => void,
}

const PageNextBtn = ({ currentPageNum, totalPages, updateCurrentPageNum, }: Props) => {
  const canNext = currentPageNum < totalPages
  const handleClick = () => {
    if (!canNext) return
    updateCurrentPageNum(currentPageNum + 1)
  }
  return (
    <button onClick={handleClick} disabled={!canNext} className={`py-1.5 px-3 flex justify-center rounded-sm border focus:outline-none focus:ring-1 focus:ring-black border-black ${!canNext ? "cursor-default text-gray-500" : "text-black"} `} >
      <BsArrowRight aria-hidden={true} className="w-6 h-6" />
      <span className="sr-only">Next page</span>
    </button>
  )
}

export default PageNextBtn