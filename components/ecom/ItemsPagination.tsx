import { AiOutlineArrowLeft } from "react-icons/ai"
import { getTotalPages } from "../../utils/paginationFns"
import PageNextBtn from "../ecom/PageNextBtn"
import PagePrevBtn from "../ecom/PagePrevBtn"

interface Props {
  pageNum: number,
  numItemsPerPage: number,
  totalItems: number,
  updateCurrentPageNum: (pageNum: number) => void,
  className?: string,
}


const ItemsPagination = ({ className, numItemsPerPage, totalItems, pageNum, updateCurrentPageNum }: Props) => {
  const totalPages = getTotalPages(numItemsPerPage, totalItems)
  return (
    <div className={`${className} flex justify-center space-x-8 items-center`}>
      <PagePrevBtn updateCurrentPageNum={updateCurrentPageNum} currentPageNum={pageNum} totalPages={totalPages} />
      <p className="">Page {pageNum} of {totalPages}</p>
      <PageNextBtn updateCurrentPageNum={updateCurrentPageNum} currentPageNum={pageNum} totalPages={totalPages} />
    </div>
  )
}

export default ItemsPagination