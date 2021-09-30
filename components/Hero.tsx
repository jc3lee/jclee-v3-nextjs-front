import Link from 'next/link'

interface Props {
  title: string,
  subtitle: string,
  ctaText: string,
  ctaLink: string,
  videoPoster: string,
  videoSrc: string,
  videoType: string,
  className?: string,
}

const Hero = ({ ctaLink, ctaText, title, subtitle, videoPoster, videoSrc, videoType, className }: Props) => {
  return (<div className={className}>
    <div className="flex flex-col items-center">
      <h1 className="leading-snug mt-40 sm:mt-48 text-2xl sm:text-3xl md:text-4xl text-center max-w-screen-md font-bold">{title}</h1>
      <p className="uppercase mt-2 text-sm sm:text-base font-normal">{subtitle}</p>
      <Link href={ctaLink}>
        <a className="relative font-bold rounded-sm mt-8 sm:mt-16 bg-blue-700 py-2 px-10 text-white shadow-md duration-200 transition hover:scale-105 hover:shadow-lg active:scale-100">{ctaText}</a>
      </Link>
    </div>
    <div className="mt-40 sm:mt-48 mx-auto max-w-screen-xl">
      <video className="w-full" loop muted autoPlay playsInline onCanPlay={(e) => { e.currentTarget.play() }} onLoadedMetadata={(e) => { e.currentTarget.muted = true }} poster={videoPoster}>
        <source src={videoSrc} type={videoType} />
        <p>Your Browser Does Not Support This Autoplay Video Feature</p>
      </video>
    </div>
  </div>
  )
}

export default Hero