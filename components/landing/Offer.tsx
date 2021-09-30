import OfferDetail from './OfferDetail'

interface Props {
  title: string,
  list: {
    imgSrc: string,
    title: string,
    text: string[],
  }[],
  className?: string,
}

const Offer = ({ title, list, className }: Props) => {
  return (
    <div className={className}>
      <h2 id="services" className="pt-24 mt-16 sm:mt-24 text-3xl sm:text-4xl lg:text-5xl text-center font-bold">{title}</h2>
      {
        list.map((offer, index) => <OfferDetail index={index} key={index} className="mt-32 sm:mt-48" {...offer} />)
      }
    </div>
  )
}

export default Offer