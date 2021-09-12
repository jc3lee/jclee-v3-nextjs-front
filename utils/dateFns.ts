import { format, parseISO, formatDistanceToNowStrict, } from "date-fns"

export const getDateStringFromISO = (iso: string) => {
  const parsedIso = parseISO(iso)
  return format(parsedIso, "MMMM dd, yyyy")
}

export const getDateStringWithTimeFromISO = (iso: string) => {
  const parsedIso = parseISO(iso)
  return format(parsedIso, "MMM dd yyyy hh:mm aaa")
}

export const getDateDistanceToNow = (iso: string) => {
  const parsedIso = parseISO(iso)
  return formatDistanceToNowStrict(parsedIso, { addSuffix: true, })
}

export const getCurrentYear = () => {
  return format(new Date(), "yyyy")
}