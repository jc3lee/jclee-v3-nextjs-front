interface Props {
  imgSrc: string,
  index: number,
  title: string,
  text: string[],
  className?: string,
}

const OfferDetail = ({ imgSrc, index, text, title, className }: Props) => {
  const isImageAfterText = index % 2 === 0
  return (
    <div className={`${className} grid grid-cols-1 md:gap-x-16 gap-y-4 sm:gap-y-8 md:gap-y-0 md:items-center md:grid-cols-2`}>
      <div className={`${isImageAfterText && "md:hidden"} max-w-sm mx-auto`}>
        <img className="object-contain w-full" src={imgSrc} alt={title} />
      </div>
      <div className="mt-10 md:mt-0">
        <h2 className=" text-xl sm:text-2xl lg:text-3xl font-bold">{title}</h2>
        {
          text.map((t, index) => <p key={index} className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed lg:leading-loose">{t}</p>)
        }
      </div>
      {isImageAfterText && <div className="hidden md:block max-w-sm mx-auto">
        <img className="object-contain w-full" src={imgSrc} alt={title} />
      </div>}
    </div>
  )
}

export default OfferDetail