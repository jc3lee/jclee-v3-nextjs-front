import React, { ReactNode } from 'react'
import { defaultCardSrc, defaultDescription, defaultTitle } from '../../myData/myHeadConfig'
import MyFooter from './MyFooter'
import MyHead from './MyHead'
import MyBlogTopNav from './MyBlogTopNav'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  imgSrc?: string
}

const MyBlogLayout = ({
  children,
  title = defaultTitle,
  imgSrc = defaultCardSrc,
  description = defaultDescription,
}: Props) => (
  <>
    <MyHead description={description} imgSrc={imgSrc} title={title} />
    <MyBlogTopNav />
    {children}
    <MyFooter />
  </>
)

export default MyBlogLayout
