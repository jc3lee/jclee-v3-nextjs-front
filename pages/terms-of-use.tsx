import type { NextPage } from 'next'
import { useEffect } from 'react'
import MyLegalBlockContent from '../components/MyLegalBlockContent'
import MyMainLayout from '../components/layout/MyMainLayout'
import { termsData } from '../myData/myTermsData'

const TermsOfUse: NextPage = () => {
  useEffect(() => {
    if (window) window.scrollTo(0, 0)
  }, [])
  return (
    <MyMainLayout>
      <div className="font-rale px-4 max-w-screen-md mx-auto pb-40">
        <h1 id="terms" className="mt-12 text-center uppercase text-3xl">{termsData.title}</h1>
        <div className="w-56 mx-auto">
          <img src={termsData.imgSrc} alt={termsData.title} className="mt-20 mb-12 w-full object-cover" />
        </div>
        {
          termsData.data.map((block, index) => <MyLegalBlockContent {...block} />)
        }
      </div>
    </MyMainLayout>
  )
}

export default TermsOfUse