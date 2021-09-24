import type { NextPage } from 'next'
import MyLayout from '../components/MyLayout'

const My404: NextPage = () => {
  return (
    <MyLayout>
      <div className="text-4xl flex justify-center items-center h-screen">404 page coming soon 😂!</div>
    </MyLayout>
  )
}

export default My404