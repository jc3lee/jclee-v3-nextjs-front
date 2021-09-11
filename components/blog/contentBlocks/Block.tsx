import BlockContentToReact from "@sanity/block-content-to-react"

const Block = (props: any) => {
  const { style = 'normal' } = props.node
  switch (style) {
    case "normal":
      return <p className="mt-6 text-base tracking-[0.015em] leading-[1.7]">{props.children}</p>
    case "h1":
      return <h1 className="mt-16 text-3xl sm:text-4xl font-semibold">{props.children}</h1>
    case "h2":
      return <h2 className="mt-12 text-2xl sm:text-3xl font-semibold">{props.children}</h2>
    case "h3":
      return <h3 className="mt-10 text-xl sm:text-2xl font-semibold">{props.children}</h3>
    case "blockquote":
      return <blockquote className="mt-8 border-l-2 border-gray-200 pl-4 font-semibold  text-lg sm:text-xl">{props.children}</blockquote>
    default:
      return BlockContentToReact.defaultSerializers.types.block(props)
  }
}

export default Block