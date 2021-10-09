import React, { ReactNode } from 'react'
import { defaultCardSrc, defaultDescription, defaultTitle } from '../myData/myHeadConfig'
import MyFooter from './MyFooter'
import MyHead from './MyHead'
import MyStoreTopNav from './MyStoreTopNav'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  imgSrc?: string
}

const MyStoreLayout = ({
  children,
  title = defaultTitle,
  imgSrc = defaultCardSrc,
  description = defaultDescription,
}: Props) => (
  <>
    <MyHead description={description} imgSrc={imgSrc} title={title} />
    <MyStoreTopNav />
    {children}
    <MyFooter />
  </>
)

export default MyStoreLayout