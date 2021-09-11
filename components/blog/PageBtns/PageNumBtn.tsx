interface Props {
  currentPageNum: number,
  pageNum: number,
  updateCurrentPageNum: (pageNum: number) => void,
}

const PageNumBtn = ({ pageNum, currentPageNum, updateCurrentPageNum }: Props) => {
  const isCurrentPageNum = currentPageNum === pageNum
  const handleClick = () => {
    if (isCurrentPageNum) return
    updateCurrentPageNum(pageNum)
  }
  return (
    <button onClick={handleClick} disabled={isCurrentPageNum} className={` w-8 h-8 rounded-full border border-gray-300 bg-gray-100 transition duration-300 ${isCurrentPageNum ? "text-blue-800 cursor-default" : "text-gray-400 hover:bg-gray-300 hover:text-white "} `} >{pageNum}</button>
  )
}

export default PageNumBtn