import { getTotalPages } from "../../utils/paginationFns"
import Pagination from "./Pagination"

interface Props {
  numItemsPerPage: number,
  currentPageNum: number,
  totalItems: number,
  updateCurrentPageNum: (pageNum: number) => void,
}

const PaginationBar = ({ numItemsPerPage, totalItems, currentPageNum, updateCurrentPageNum, }: Props) => {
  const totalPages = getTotalPages(numItemsPerPage, totalItems,)

  return (
    <div className="flex justify-between items-center">
      <Pagination updateCurrentPageNum={updateCurrentPageNum} totalPages={totalPages} currentPageNum={currentPageNum} />
      <div className="text-sm text-gray-500" >Page {currentPageNum} of {totalPages}</div>
    </div>
  )

}

export default PaginationBar