
interface Props {
  className?: string,
}

const RelatedItems = ({ className, }: Props) => {
  return (
    <div className={className}>
      <h2 className="uppercase font-bold text-center">You may also like</h2>
      <div className="grid grid-cols-4">
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
        <div className=""></div>
      </div>
    </div>
  )
}

export default RelatedItems