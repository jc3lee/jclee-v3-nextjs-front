import React, { ReactNode } from 'react'
import { defaultCardSrc, defaultDescription, defaultTitle } from '../myData/myHeadConfig'
import MyFooter from './MyFooter'
import MyHead from './MyHead'
import MyMainTopNav from './MyMainTopNav'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  imgSrc?: string
}

const MyMainLayout = ({
  children,
  title = defaultTitle,
  imgSrc = defaultCardSrc,
  description = defaultDescription,
}: Props) => (
  <>
    <MyHead description={description} imgSrc={imgSrc} title={title} />
    <MyMainTopNav />
    {children}
    <MyFooter />
  </>
)

export default MyMainLayout
