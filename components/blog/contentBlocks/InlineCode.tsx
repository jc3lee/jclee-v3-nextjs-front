interface Props {
  code: string,
}

const InlineCode = ({ code, }: Props) => {
  return (
    <span className="font-mono bg-gray-100 rounded-sm py-0.5 px-1 text-base" >{code}</span>
  )
}

export default InlineCode