interface Props {
  className?: string,
}

const DividerV = ({ className, }: Props) => {
  return (
    <div className={`${className || ""} border-r`}></div>
  )
}

export default DividerV