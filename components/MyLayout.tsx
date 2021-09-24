import React, { ReactNode } from 'react'
import { defaultCardSrc, defaultDescription, defaultTitle } from '../myData/myHeadConfig'
import MyFooter from './MyFooter'
import MyHead from './MyHead'
import MyTopNav from './MyTopNav'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  imgSrc?: string
}

const MyLayout = ({
  children,
  title = defaultTitle,
  imgSrc = defaultCardSrc,
  description = defaultDescription,
}: Props) => (
  <>
    <MyHead description={description} imgSrc={imgSrc} title={title} />
    <MyTopNav />
    {children}
    <MyFooter />
  </>
)

export default MyLayout
