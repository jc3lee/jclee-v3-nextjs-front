import type { NextPage } from 'next'
import Link from 'next/link'
import ContactForm from '../components/ContactForm'
import MyMainLayout from '../components/MyMainLayout'
import { ImTwitter } from "react-icons/im"
import { FaLinkedinIn } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { FiInstagram } from "react-icons/fi"
import Newsletter from '../components/blog/Newsletter'
import { INSTAGRAM_ID, LINKEDIN_ID, MAIL, TWITTER_ID, } from "../myData/mySocials"
import { useEffect } from 'react'
import Hero from '../components/landing/Hero'
import { heroData } from '../myData/myHeroData'
import Offer from '../components/landing/Offer'
import { offerData } from '../myData/myOfferData'
import About from '../components/landing/About'
import { aboutData } from '../myData/myAboutData'
import Contact from '../components/landing/Contact'
import { contactData } from '../myData/myContactData'

const Home: NextPage = () => {
  useEffect(() => {
    if (window) window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.classList.add("smooth")
    return () => document.documentElement.classList.remove("smooth")
  }, [])

  return (
    <MyMainLayout>
      <div className="font-rale px-4 max-w-screen-xl mx-auto">
        <Hero {...heroData} />
        <Offer {...offerData} />
        <About {...aboutData} />
        <Contact {...contactData} />
      </div>
      <div className="w-full px-4 mt-28 sm:mt-48 border-t sm:border-t-0">
        <Newsletter />
      </div>
    </MyMainLayout>
  )
}

export default Home