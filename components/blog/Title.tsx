interface Props {
  title: string,
  className?: string,
}

const Title = ({ className, title }: Props) => {
  return (
    <h1 className={`${className} text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight`}>{title}</h1>
  )
}

export default Title