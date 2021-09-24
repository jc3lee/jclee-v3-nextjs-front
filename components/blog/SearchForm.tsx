import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';

interface Props {
  className?: string,
  handleSearch: (s: string) => void,
}

type Inputs = {
  search: string,
}

const SearchForm = ({ className, handleSearch, }: Props) => {
  const { register, handleSubmit, formState: { errors }, reset, } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // reset({ search: "", })
    // console.log(data)
    handleSearch(data.search)
  }

  return (
    <form className={`${className} w-full flex flex-col`} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="nameId" className="text-xl tracking-tight">Search for</label>
      <div className="relative mt-2">
        <input id="nameId" className="text-lg w-full py-1 px-2 md:px-0 border-b border-gray-800 focus:outline-none focus:border-black" {...register('search', { required: true })} />
        <button className="absolute top-0 right-1 ml-2 focus:outline-none text-gray-800 focus:text-black">
          <span className="sr-only">search</span>
          <AiOutlineSearch aria-hidden={true} className="h-6 w-6" />
        </button>
      </div>
    </form>
  )
}

export default SearchForm