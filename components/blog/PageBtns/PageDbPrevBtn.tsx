import CaretDbLeft from "../../icons/CaretDbLeft"

interface Props {
  updateCurrentPageNum: (pageNum: number) => void,
}

const PageDbPrevBtn = ({ updateCurrentPageNum }: Props) => {
  const handleClick = () => {
    updateCurrentPageNum(1)
  }
  return (
    <button onClick={handleClick} className={`flex justify-center items-center w-8 h-8 rounded-full border border-gray-300 bg-gray-100 transition duration-300 text-gray-500 hover:bg-gray-300 hover:text-white`} ><CaretDbLeft className="" /></button>
  )
}

export default PageDbPrevBtn