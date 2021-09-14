import React, { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import MyHead from './MyHead'
import MyTopNav from './MyTopNav'
import MyFooter from './MyFooter'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  imgSrc?: string
}

const MyLayout = ({
  children,
  title = 'Hey u',
  imgSrc = "",
  description = 'Description',
}: Props) => (
  <>
    <MyHead description={description} imgSrc={imgSrc} title={title} />
    <MyTopNav />
    {children}
    <MyFooter />
  </>
)

export default MyLayout
