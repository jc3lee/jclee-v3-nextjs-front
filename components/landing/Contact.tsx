import { FaLinkedinIn } from "react-icons/fa"
import { FiInstagram } from "react-icons/fi"
import { HiOutlineMail } from "react-icons/hi"
import { ImTwitter } from "react-icons/im"
import ContactForm from "./ContactForm"

interface Props {
  title: string,
  instagramId: string,
  instagramText: string,
  linkedinId: string,
  linkedinText: string,
  mail: string,
  mailText: string,
  twitterId: string,
  twitterText: string,
  className?: string,
}

const Contact = ({ title, className, instagramId, instagramText, linkedinId, linkedinText, mail, mailText, twitterId, twitterText, }: Props) => {
  return (
    <div className={`${className} max-w-screen-md mx-auto`}>
      <h2 id="contact" className="pt-24 mt-24 text-3xl sm:text-4xl lg:text-5xl text-center font-bold">{title}</h2>
      <div className="mt-12 sm:mt-24">
        <ContactForm />
      </div>
      <div className="flex items-center mt-12">
        <div className="flex-1 border-b"></div>
        <h2 className="px-4 font-semibold text-xl uppercase">or</h2>
        <div className="flex-1 border-b"></div>
      </div>
      <div className="mt-12 flex flex-col sm:flex-row justify-center items-center sm:items-start sm:space-x-10">
        <a rel="noreferrer noopener" href={`https://www.twitter.com/${twitterId}`} className="rounded-full w-16 h-16 border border-blue-400 flex justify-center items-center text-blue-400 hover:bg-blue-400 focus:bg-blue-400 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none">
          <ImTwitter className="w-5 h-5" />
          <span className="sr-only">Twitter</span>
        </a>
        <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">
          {twitterText}</p>
        <a rel="noreferrer noopener" href={`https://www.linkedin.com/${linkedinId}`} className="rounded-full w-16 h-16 border border-blue-600 flex justify-center items-center text-blue-600 hover:bg-blue-600 focus:bg-blue-600 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none">
          <FaLinkedinIn className="w-5 h-5" />
          <span className="sr-only">Linkedin</span>
        </a>
        <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">{linkedinText}</p>
        <a rel="noreferrer noopener" href={`https://www.instagram.com/${instagramId}`} className="rounded-full w-16 h-16 border border-red-400 flex justify-center items-center text-red-400 hover:bg-red-400 focus:bg-red-400 hover:text-white focus:text-white transition-colors duration-200 focus:outline-none">
          <FiInstagram className="w-5 h-5" />
          <span className="sr-only">Instagram</span>
        </a>
        <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">{instagramText}</p>
        <a href={`mailto:${mail}`} className="rounded-full w-16 h-16 border border-black flex justify-center items-center text-black hover:bg-black focus:bg-black hover:text-white focus:text-white transition-colors duration-200 focus:outline-none">
          <HiOutlineMail className="w-5 h-5" />
          <span className="sr-only">Mail</span>
        </a>
        <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">{mailText}</p>
      </div>
    </div>
  )
}

export default Contact