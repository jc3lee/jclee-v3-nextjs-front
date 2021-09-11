import TagBtn from "./TagBtn"

interface TagBarProps {
  tags: string[],
  className?: string,
}

const TagBar = ({ tags, className, }: TagBarProps) => {
  return (
    <div className={`${className} flex items-center flex-wrap`}>
      <div className="hidden sm:block flex-1 border-b-2 border-blue-700"></div>
      {
        tags.map((t, index) => (
          <div className="flex items-center flex-wrap">
            <TagBtn className="text-xs sm:text-base mr-4 sm:mr-2 sm:ml-2" key={t} tag={t} />
            {index + 1 < tags.length && <span className="hidden sm:inline-block w-4 border-b-2 border-blue-700"></span>}
          </div>
        ))
      }
      <div className="hidden sm:block flex-1 border-b-2 border-blue-700"></div>
    </div>
  )
}

export default TagBar