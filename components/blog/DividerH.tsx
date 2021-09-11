interface Props {
  className?: string,
}

const DividerH = ({ className, }: Props) => {
  return (
    <div className={`${className || ""} border-b`}></div>
  )
}

export default DividerH