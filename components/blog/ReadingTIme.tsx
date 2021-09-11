interface Props {
  readingTime: string,
  className?: string,
}

const ReadingTime = ({ readingTime, className, }: Props) => {
  return (
    <p className={className}>{readingTime}</p>
  )
}

export default ReadingTime