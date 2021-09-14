interface Props {
  title: string,
  className?: string,
}

const Title = ({ className, title }: Props) => {
  return (
    <h1 className={`${className} font-semibold leading-tight`}>{title}</h1>
  )
}

export default Title