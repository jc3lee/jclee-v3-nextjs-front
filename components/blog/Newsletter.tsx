const Newsletter = () => {
  return (
    <form onSubmit={(e) => { e.preventDefault() }} className="my-24 relative py-12 px-4 sm:px-0 max-w-xl border mx-auto border-blue-700 rounded-md text-center">
      <label className="absolute bg-white -top-3 left-3 px-1 font-semibold" htmlFor="emailId">JC Lee’s Newsletter</label>
      <label htmlFor="emailId" className="text-xl font-semibold">Get my best posts in your inbox</label>
      <div className="flex flex-col sm:flex-row justify-center mt-4">
        <input required={true} className="focus:outline-none focus:ring-1 focus:ring-blue-700 border-gray-700 border py-1 px-2 mr-0" type="email" name="email" id="emailId" placeholder="Email Address" />
        <button className="mt-2 sm:mt-0 bg-blue-700 text-white py-1 px-4 ml-0 focus:outline-none hover:bg-opacity-80 focus:bg-opacity-80 transition duration-100">Subscribe</button>
      </div>
    </form>
  )
}

export default Newsletter