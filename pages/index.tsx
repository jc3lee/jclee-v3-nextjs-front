import type { NextPage } from 'next'
import { useEffect } from 'react'
import Newsletter from '../components/blog/Newsletter'
import About from '../components/landing/About'
import Contact from '../components/landing/Contact'
import Hero from '../components/landing/Hero'
import Offer from '../components/landing/Offer'
import MyMainLayout from '../components/layout/MyMainLayout'
import { aboutData } from '../myData/myAboutData'
import { contactData } from '../myData/myContactData'
import { heroData } from '../myData/myHeroData'
import { offerData } from '../myData/myOfferData'

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