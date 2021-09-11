import CaretRight from "../../icons/CaretRight"

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
    <button onClick={handleClick} disabled={!canNext} className={`flex justify-center items-center w-8 h-8 rounded-full border border-gray-300 bg-gray-100 transition duration-300 ${!canNext ? "cursor-default text-gray-300" : "text-gray-500 hover:bg-gray-300 hover:text-white "} `} ><CaretRight className="" /></button>
  )

}

export default PageNextBtn