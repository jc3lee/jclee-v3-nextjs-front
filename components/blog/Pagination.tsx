import { getPageNumBtnArr, } from "../../utils/paginationFns"
import PageDbNextBtn from "./PageBtns/PageDbNextBtn"
import PageDbPrevBtn from "./PageBtns/PageDbPrevBtn"
import PageNextBtn from "./PageBtns/PageNextBtn"
import PageNumBtn from "./PageBtns/PageNumBtn"
import PagePrevBtn from "./PageBtns/PagePrevBtn"

interface Props {
  currentPageNum: number,
  totalPages: number,
  updateCurrentPageNum: (pageNum: number) => void,
}

const Pagination = ({ totalPages, currentPageNum, updateCurrentPageNum, }: Props) => {
  const pageNumBtnArr = getPageNumBtnArr(totalPages, currentPageNum)

  return (
    <div className="flex text-sm">
      {currentPageNum > 2 && <PageDbPrevBtn updateCurrentPageNum={updateCurrentPageNum} />}
      <PagePrevBtn updateCurrentPageNum={updateCurrentPageNum} currentPageNum={currentPageNum} totalPages={totalPages} />
      {
        pageNumBtnArr.map(pageNum => <PageNumBtn updateCurrentPageNum={updateCurrentPageNum} key={pageNum} currentPageNum={currentPageNum} pageNum={pageNum} />)
      }
      <PageNextBtn updateCurrentPageNum={updateCurrentPageNum} currentPageNum={currentPageNum} totalPages={totalPages} />
      {currentPageNum + 1 < totalPages && <PageDbNextBtn updateCurrentPageNum={updateCurrentPageNum} totalPages={totalPages} />}
    </div>
  )

}

export default Pagination