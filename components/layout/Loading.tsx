const Loading = () => {
  return (
    <svg className="h-20 w-20" viewBox="0 0 80 80">
      <circle className="text-gray-300 stroke-current stroke-2" cx="40" cy="40" r="18" strokeLinecap="round" fill="none"></circle>
      <circle className="text-gray-600 animate-spin origin-center stroke-current stroke-2" cx="40" cy="40" r="18" strokeLinecap="round" fill="none" strokeDasharray="25 100"></circle>
    </svg>
  )
}

export default Loading
