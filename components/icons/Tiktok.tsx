import { IoLogoTiktok } from "react-icons/io5"

interface Props {
  alt?: string,
  className?: string,
}

const Tiktok = ({ alt, className, }: Props) => {
  return (
    <div>
      <IoLogoTiktok className={className} />
      <span className="sr-only">{alt || "TikTok"}</span>
    </div>
  )
}

export default Tiktok