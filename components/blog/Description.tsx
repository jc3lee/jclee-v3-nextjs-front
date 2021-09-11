interface Props {
  description: string,
  className?: string,
}

const Description = ({ className, description }: Props) => {
  return (
    <p className={`${className} text-base text-gray-500 leading-tight max-w-screen-lg`}>{description.slice(0, 150)}</p>
  )
}

export default Description