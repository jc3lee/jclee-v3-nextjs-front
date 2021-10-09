import Head from 'next/head'
import { myWebsite } from '../../myData/myHeadConfig'

type Props = {
  title: string
  description: string
  imgSrc: string
}

// Meta Tags Generated via http://heymeta.com 

const MyHead = ({ description, title, imgSrc }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      {/* <!-- HTML Meta Tags --> */}
      <meta name="description" content={description} />

      {/* <!-- Google / Search Engine Tags --> */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={imgSrc} />

      {/* <!-- Facebook Meta Tags --> */}
      <meta property="og:url" content={myWebsite} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgSrc} />

      {/* <!-- Twitter Meta Tags --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgSrc} />
    </Head>
  )
}

export default MyHead