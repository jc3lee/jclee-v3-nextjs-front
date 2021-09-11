interface Props {
  children: any,
  level: string,
  type: string,
}

const List = ({ children, level, type }: Props) => {
  if (type === "bullet") {
    return (<ul className="mt-6 list-disc list-inside flex flex-col space-y-2  tracking-[0.015em] leading-[1.7]" >{children}</ul>)
  }
  return (<ol className="mt-6 list-decimal list-inside flex flex-col space-y-2  tracking-[0.015em] leading-[1.7]" >{children}</ol>)
}

export default List