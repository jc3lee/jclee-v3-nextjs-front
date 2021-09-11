import Prism from "prismjs"
import "prismjs/components/prism-typescript"
import { useEffect } from "react"

interface Props {
  language: string,
  code: string,
}

const Code = ({ language, code }: Props) => {
  useEffect(() => {
    Prism.highlightAll()
  })
  return (
    <div className="mt-6">
      <pre className={`language-${language}`}>
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  )
}

export default Code