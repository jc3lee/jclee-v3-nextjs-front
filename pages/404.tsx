import type { NextPage } from 'next'
import MyMainLayout from '../components/MyMainLayout'

const My404: NextPage = () => {
  return (
    <MyMainLayout>
      <div className="pb-40 px-4">
        <div className="w-56 mx-auto">
          <img src="/images/404.png" alt="404 page" className="mt-40 sm:mt-48 w-full object-cover" />
        </div>
        <h1 className="leading-snug mt-16 sm:mt-20 text-lg sm:text-xl md:text-2xl text-center mx-auto font-semibold max-w-screen-sm">
          404: Sorry friend, the page you are looking for doesn't exist.
        </h1>
      </div>
    </MyMainLayout>
  )
}

export default My404