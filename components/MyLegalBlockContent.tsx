export type LegalBlockType = "header" | "normal" | "emphasize"
interface Props {
  type: LegalBlockType,
  content: string,
  linkText?: string,
  linkTo?: string,
}

// MISC - should replace with sanity later on
//hack component - a better way would be to save to sanity and use react block content OR using markdown with react-markdown.
//this method is faster and suits my current needs
// actually not faster.
const MyLegalBlockContent = ({ type, content, linkTo = "", linkText = "" }: Props) => {
  switch (type) {
    case "normal":
      return <p className="mt-2 leading-relaxed">{content}{linkTo && linkText && <a rel="noopener noreferrer" className="underline text-blue-700 font-open" href={linkTo}>{linkText}</a>}.</p>
    case "emphasize":
      return <p className="mt-2 leading-relaxed font-bold">{content}</p>
    case "header":
      return <h2 className="text-xl mt-6 font-semibold">{content}</h2>
    default:
      throw new Error("No such legal block mate!");
  }
}

export default MyLegalBlockContent