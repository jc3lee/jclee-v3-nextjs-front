import Link from "next/link"

interface Props {
  text: string,
  href: string,
}

const ExternalLink = ({ text, href }: Props) => {
  return (<Link href={href}><a target="_blank" rel="noopener noreferrer" className="underline text-blue-700 hover:text-blue-600">{text}</a></Link>)
}

export default ExternalLink