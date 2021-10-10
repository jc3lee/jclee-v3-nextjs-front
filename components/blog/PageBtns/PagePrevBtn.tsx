import { HiOutlineChevronLeft } from "react-icons/hi"

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
    <button onClick={handleClick} disabled={!canPrev} className={`flex justify-center items-center w-8 h-8 rounded-full border border-gray-300 bg-gray-100 transition duration-300 ${!canPrev ? "cursor-default text-gray-300" : "text-gray-500 hover:bg-gray-300 hover:text-white"} `} ><HiOutlineChevronLeft className="" /></button>
  )

}

export default PagePrevBtn