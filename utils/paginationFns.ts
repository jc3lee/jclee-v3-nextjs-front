export const getTotalPages = (numItemsPerPage: number, totalItems: number) => {
  return Math.ceil(totalItems / numItemsPerPage)
}

export const getPageNumBtnArr = (totalPages: number, currentPageNum: number) => {
  const finalNumArr: number[] = []
  if (currentPageNum > 2) {
    finalNumArr.push(currentPageNum - 2)
  }
  if (currentPageNum > 1) {
    finalNumArr.push(currentPageNum - 1)
  }
  finalNumArr.push(currentPageNum)
  if (currentPageNum < totalPages) {
    finalNumArr.push(currentPageNum + 1)
  }
  if (currentPageNum + 1 < totalPages) {
    finalNumArr.push(currentPageNum + 2)
  }
  return finalNumArr
}

