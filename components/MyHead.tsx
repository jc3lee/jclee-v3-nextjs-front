import Head from 'next/head'

type Props = {
  title?: string
  description: string
  imgSrc: string
}

const MyHead = ({ description, title, imgSrc }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        content={imgSrc}
      />
    </Head>
  )
}

export default MyHead