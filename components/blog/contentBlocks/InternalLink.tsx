import Link from "next/link"
import { getPathFromSlugAndType, SanityTypes } from "../../../sanity/tools"

interface Props {
  text: string,
  slug: string,
  type: string,
}

const InternalLink = ({ text, slug, type }: Props) => {
  return (
    <Link href={getPathFromSlugAndType(slug, type as SanityTypes)}>
      <a className="underline text-blue-700 hover:text-blue-600">{text}</a></Link>
  )
}

export default InternalLink