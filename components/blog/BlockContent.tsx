import BlockContentToReact from "@sanity/block-content-to-react"
import Block from "./contentBlocks/Block"
import Bold from "./contentBlocks/Bold"
import Code from "./contentBlocks/Code"
import ExternalLink from "./contentBlocks/ExternalLink"
import Figure from "./contentBlocks/Figure"
import InlineCode from "./contentBlocks/InlineCode"
import InternalLink from "./contentBlocks/InternalLink"
import List from "./contentBlocks/List"
import Twitter from "./contentBlocks/Twitter"
import Youtube from "./contentBlocks/Youtube"
import Instagram from "./contentBlocks/Instagram"
import TikTok from "./contentBlocks/TikTok"
import Codepen from "./contentBlocks/Codepen"

interface Props {
  blocks: any,
  className?: string,
}

const serializers = {
  list: List,
  marks: {
    bold: ({ children, }: any) => {
      return <Bold text={children[0]} />
    },
    code: ({ children, }: any) => {
      return <InlineCode code={children[0]} />
    },
    internalLink: ({ children, mark }: any) => {
      if (!mark || !mark.slugAndType) return null
      const { slug, type } = mark.slugAndType
      return <InternalLink slug={slug} text={children[0]} type={type} />
    },
    link: ({ children, mark }: any) => {
      if (!mark || !mark.href) return null
      return <ExternalLink text={children[0]} href={mark.href} />
    },
  },
  types: {
    block: Block,
    code: (props: any) => {
      const { language, code } = props.node
      return <Code language={language} code={code} />
    },
    codepen: (props: any) => {
      const { url } = props.node
      return <Codepen url={url} />
    },
    figure: (props: any) => {
      const { alt, imageUrl, size, } = props.node
      return <Figure imageUrl={imageUrl} alt={alt} size={size} />
    },
    instagram: (props: any) => {
      const { url } = props.node
      return <Instagram url={url} />
    },
    tiktok: (props: any) => {
      const { url } = props.node
      return (
        <TikTok url={url} />
      )
    },
    twitter: (props: any) => {
      const { url } = props.node
      return (
        <Twitter url={url} />
      )
    },
    youtube: (props: any) => {
      const { url } = props.node
      return (
        <Youtube url={url} />
      )
    },

  },
}

const BlockContent = ({ blocks, className }: Props) => {
  return (
    <div className={className}>
      <BlockContentToReact blocks={blocks} serializers={
        {
          list: List,
          marks: {
            bold: ({ children, }: any) => {
              return <Bold text={children[0]} />
            },
            code: ({ children, }: any) => {
              return <InlineCode code={children[0]} />
            },
            internalLink: ({ children, mark }: any) => {
              if (!mark || !mark.slugAndType) return null
              const { slug, type } = mark.slugAndType
              return <InternalLink slug={slug} text={children[0]} type={type} />
            },
            link: ({ children, mark }: any) => {
              if (!mark || !mark.href) return null
              return <ExternalLink text={children[0]} href={mark.href} />
            },
          },
          types: {
            block: Block,
            code: (props: any) => {
              const { language, code } = props.node
              return <Code language={language} code={code} />
            },
            codepen: (props: any) => {
              const { url } = props.node
              return <Codepen url={url} />
            },
            figure: (props: any) => {
              const { alt, imageUrl, size, } = props.node
              return <Figure imageUrl={imageUrl} alt={alt} size={size} />
            },
            instagram: (props: any) => {
              const { url } = props.node
              return <Instagram url={url} />
            },
            tiktok: (props: any) => {
              const { url } = props.node
              return (
                <TikTok url={url} />
              )
            },
            twitter: (props: any) => {
              const { url } = props.node
              return (
                <Twitter url={url} />
              )
            },
            youtube: (props: any) => {
              const { url } = props.node
              return (
                <Youtube url={url} />
              )
            },

          },
        }
      } />
    </div>
  )
}

export default BlockContent