interface Props {
  text: string,
}

const Bold = ({ text, }: Props) => {
  return (
    <span className=" font-semibold" >{text}</span>
  )
}

export default Bold