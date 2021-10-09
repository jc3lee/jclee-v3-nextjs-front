import type { NextPage } from 'next'
import { useEffect } from 'react'
import MyLegalBlockContent from '../components/MyLegalBlockContent'
import MyMainLayout from '../components/layout/MyMainLayout'
import { privacyData } from '../myData/myPrivacyData'

const Privacy: NextPage = () => {
  useEffect(() => {
    if (window) window.scrollTo(0, 0)
  }, [])
  return (
    <MyMainLayout>
      <div className="font-rale px-4 max-w-screen-md mx-auto pb-40">
        <h1 id="privacy" className="mt-12 text-center uppercase text-3xl">{privacyData.title}</h1>
        <div className="w-56 mx-auto">
          <img src={privacyData.imgSrc} alt={privacyData.title} className="mt-20 mb-12 w-full object-cover" />
        </div>
        {
          privacyData.data.map((block, index) => <MyLegalBlockContent key={index} {...block} />)
        }
      </div>
    </MyMainLayout>
  )
}

export default Privacy