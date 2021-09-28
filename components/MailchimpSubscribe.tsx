

const MailChimpSubscribe = () => {
  return (
    <form onSubmit={(e) => { e.currentTarget.reset() }} className="my-24 relative py-12 px-4 sm:px-0 max-w-xl border mx-auto border-blue-700 rounded-md text-center" action="https://app.us2.list-manage.com/subscribe/post?u=a7cbedf6dd34a281f29f9ddde&amp;id=c34e73a502" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
      <label className="absolute bg-white -top-3 left-3 px-1 font-semibold" htmlFor="emailId">JC Lee’s Newsletter</label>
      <label htmlFor="emailId" className="text-xl font-semibold">Get my best posts in your inbox</label>
      <div className="flex flex-col sm:flex-row justify-center mt-4">
        <input required={true} type="email" name="EMAIL" className="focus:outline-none focus:ring-1 focus:ring-blue-700 border-gray-700 border py-1 px-2 mr-0 text-center sm:text-left" id="emailId" placeholder="Email Address" />
        <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="mt-2 sm:mt-0 bg-blue-700 text-white py-1 px-4 ml-0 focus:outline-none hover:bg-opacity-80 focus:bg-opacity-80 transition duration-100" />
      </div>
      <div id="mce-responses" className="clear">
        <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
        <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
      </div>
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <input type="text" name="b_a7cbedf6dd34a281f29f9ddde_c34e73a502" tabIndex={-1} value="" />
      </div>
    </form>
  )
}

export default MailChimpSubscribe