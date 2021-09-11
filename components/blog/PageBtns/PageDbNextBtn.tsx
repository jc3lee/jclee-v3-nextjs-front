import CaretDbRight from "../../icons/CaretDbRight"

interface Props {
  totalPages: number,
  updateCurrentPageNum: (pageNum: number) => void,
}

const PageDbNextBtn = ({ updateCurrentPageNum, totalPages }: Props) => {
  const handleClick = () => {
    updateCurrentPageNum(totalPages)
  }
  return (
    <button onClick={handleClick} className={`flex justify-center items-center w-8 h-8 rounded-full border border-gray-300 bg-gray-100 transition duration-300 text-gray-500 hover:bg-gray-300 hover:text-white`} ><CaretDbRight className="" /></button>
  )

}

export default PageDbNextBtn