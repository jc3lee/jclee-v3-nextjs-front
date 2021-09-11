import { getDateDistanceToNow } from "../../utils/dateFns"

interface Props {
  publishedAt: string,
  className?: string,
}

const PublishedDate = ({ publishedAt, className, }: Props) => {
  return (
    <p className={className}>{getDateDistanceToNow(publishedAt)}</p>
  )
}

export default PublishedDate