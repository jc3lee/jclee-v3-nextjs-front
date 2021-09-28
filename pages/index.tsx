import type { NextPage } from 'next'
import Link from 'next/link'
import ContactForm from '../components/ContactForm'
import MyMainLayout from '../components/MyMainLayout'
import { ImTwitter } from "react-icons/im"
import { FaLinkedinIn } from "react-icons/fa"
import { HiOutlineMail } from "react-icons/hi"
import { FiInstagram } from "react-icons/fi"
import Newsletter from '../components/blog/Newsletter'
import { INSTAGRAM_ID, LINKEDIN_ID, MAIL, TWITTER_ID, } from "../myData/mySocials"
import { useEffect } from 'react'


const Home: NextPage = () => {

  useEffect(() => {
    document.documentElement.classList.add("smooth")
    return () => document.documentElement.classList.remove("smooth")
  }, [])

  return (
    <MyMainLayout>
      <div className="font-rale px-4 max-w-screen-xl mx-auto">
        <div className="">
          <div className="flex flex-col items-center">
            <h1 className="leading-snug mt-40 sm:mt-48 text-2xl sm:text-3xl md:text-4xl text-center max-w-screen-md font-bold">I design and build the custom website you need to bring your brand to the next level.</h1>
            <p className="uppercase mt-2 text-sm sm:text-base font-normal">JC Lee - Web designer & developer</p>
            <Link href="#contact">
              <a className="relative font-bold rounded-sm mt-8 sm:mt-16 bg-blue-700 py-2 px-10 text-white shadow-md duration-200 transition hover:scale-105 hover:shadow-lg active:scale-100">Get in touch</a>
            </Link>
          </div>
          <video src="/videos/hero2.mp4" loop={true} className="mt-40 sm:mt-48 mx-auto max-w-screen-xl w-full" autoPlay={true} muted={true}></video>
        </div>
        <div className="">
          <h2 id="services" className="pt-24 mt-16 sm:mt-24 text-3xl sm:text-4xl lg:text-5xl text-center font-bold">What do I offer?</h2>
          <div className="mt-24 sm:mt-36 md:mt-40 grid grid-cols-1 md:gap-x-16 gap-y-4 sm:gap-y-8 md:gap-y-0 md:items-center md:grid-cols-2">
            <div className="row-start-2 md:row-start-1">
              <h2 className=" text-xl sm:text-2xl lg:text-3xl font-bold">Cutting-edge website</h2>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">For static websites, all the pages are pre-built and optimized so loading and navigating between pages is lightning fast which leads to better user experience and SEO.</p>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">
                For websites that have a backend, I'm using Jamstack which makes fast, highly performant, low maintenance and scalable websites. The backend lives in the cloud. The frontend pages are build and save on CDN - which is like a network of servers around the world that serves the requested pages at record speed.</p>
            </div>
            <div className="">
              <div className="max-w-sm mx-auto px-10 sm:px-0">
                <div className="aspect-w-1 aspect-h-1">
                  <img className="object-contain w-full" src="/images/cutting-edge.png" alt="cutting-edge" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-32 sm:mt-48 grid grid-cols-1 md:gap-x-16 gap-y-8 md:gap-y-0 md:items-center md:grid-cols-2">
            <div className="">
              <div className="max-w-sm mx-auto px-10 sm:px-0">
                <div className="aspect-w-1 aspect-h-1">
                  <img className="object-contain w-full" src="/images/resp-design.png" alt="responsive design" />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className=" text-xl sm:text-2xl lg:text-3xl font-bold">Responsive design</h2>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">Responsive design is making sure our website looks great on all devices. I design the mobile, tablet and desktop version with the Figma design tool. </p>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">
                Then I build it with pixel level accuracy using TailwindCSS. If you are on a desktop, you can try resizing this window and see the page adapt to the change in screen size.</p>
            </div>
          </div>
          <div className="mt-32 sm:mt-48 grid grid-cols-1 md:gap-x-16 gap-y-8 md:gap-y-0 md:items-center md:grid-cols-2">
            <div className="row-start-2 md:row-start-1">
              <h2 className=" text-xl sm:text-2xl lg:text-3xl font-bold">Simple and intuitive UX design</h2>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">A great UX is one that doesn’t make the user pause and guess. No text should look like links, no awkward buttons or puzzling forms. And no convoluted structure where the user has to push the right combinaison of buttons to get to the final boss.</p>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">
                I design and build with the users' experience in mind. One of my top priority is making sure they get a fulfilling experience.</p>
            </div>
            <div className="">
              <div className="max-w-sm mx-auto px-10 sm:px-0">
                <div className="aspect-w-1 aspect-h-1">
                  <img className="object-contain w-full" src="/images/ux-design.png" alt="ux design" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-32 sm:mt-48 grid grid-cols-1 md:gap-x-16 gap-y-8 md:gap-y-0 md:items-center md:grid-cols-2">
            <div className="">
              <div className="max-w-sm mx-auto px-10 sm:px-0">
                <div className="aspect-w-1 aspect-h-1">
                  <img className="object-contain w-full" src="/images/ui-design.png" alt="responsive design" />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className=" text-xl sm:text-2xl lg:text-3xl font-bold">Delightful UI</h2>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">The UI is the tour guide for your content. How you show it is as important as what you are showing. </p>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">
                A voice-actor for kids’ website should be more colorful and fun than an accountant’s one.</p>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">
                After studying your business, I design the overall theme. And select the colors, typography, imagery and content that best reflect your brand.</p>
            </div>
          </div>
          <div className="mt-32 sm:mt-48 grid grid-cols-1 md:gap-x-16 gap-y-8 md:gap-y-0 md:items-center md:grid-cols-2">
            <div className="row-start-2 md:row-start-1">
              <h2 className=" text-xl sm:text-2xl lg:text-3xl font-bold">Purpose-driven website</h2>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">Now that your users have a deeper understanding about your product/service, we need to guide them into action. A website without a purpose is a useless one. In marketing terms, it's called a "Call To Action" or CTA. </p>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">
                The CTA can be a sign up form for your newsletter, selling a product/service, asking for donation, a contact form, or simply linking to your other social accounts. And everything else in the website should lead to it so that by the time the user reach this CTA button or form they feel compelled to take that extra step.</p>
            </div>
            <div className="">
              <div className="max-w-sm mx-auto px-10 sm:px-0">
                <div className="aspect-w-1 aspect-h-1">
                  <img className="object-contain w-full" src="/images/purpose-driven-website.png" alt="purpose driven website" />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-32 sm:mt-48 grid grid-cols-1 md:gap-x-16 gap-y-8 md:gap-y-0 md:items-center md:grid-cols-2">
            <div className="">
              <div className="max-w-sm mx-auto px-10 sm:px-0">
                <div className="aspect-w-1 aspect-h-1">
                  <img className="object-contain w-full" src="/images/seo.png" alt="seo optimization" />
                </div>
              </div>
            </div>
            <div className="">
              <h2 className=" text-xl sm:text-2xl lg:text-3xl font-bold">Search Engine Optimization (SEO)</h2>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">The websites I built follow all the SEO best practices (accessible content, correct markup hierarchy, optimized images, etc). They have the potential to rank high on Google Search.</p>
              <p className="mt-4 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose">
                For advanced SEO, you can refer with a SEO expert. Beware of tricks like keywords monitoring and link building strategies. These practices work but are costly and fake just like buying followers work to a certain extent.</p>
            </div>
          </div>
        </div>
        <div className="max-w-screen-md mx-auto">
          <h2 id="about" className="pt-24 mt-24 text-3xl sm:text-4xl lg:text-5xl text-center font-bold">About me</h2>
          <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full mx-auto mt-16 sm:mt-28">
            <img className="object-cover rounded-full" src="/images/me-v1.png" alt="JC Lee" />
          </div>
          <p className="mt-2 sm:mt-4 text-xl sm:text-2xl lg:text-3xl text-center font-bold">JC Lee</p>
          <div className="mt-4 sm:mt-8">
            <p className="text-base leading-relaxed sm:leading-loose">
              I'm JC Lee, 28. I'm an awkward introverted nerd who likes people and spend 8-12h a day, 7 days a week learning and building projects.
            </p>
            <p className="text-base leading-relaxed sm:leading-loose">
              When I need a break, I enjoy watching korean shows and reading mangas.
            </p>
            <p className="text-base leading-relaxed sm:leading-loose">
              I design projects with the Figma design tool.
            </p>
            <p className="text-base leading-relaxed sm:leading-loose">
              I'm also a full stack developer - meaning I can make static websites and websites with a database and backend server.
            </p>
            <p className="text-base mt-4 leading-relaxed sm:leading-loose">
              My skills are, but not limited to:
            </p>
            <ul className="list-inside list-disc sm:space-y-2 sm:mt-2">
              <li>HTML, CSS, Javascript.</li>
              <li>MongoDB, Express, ReactJS, NodeJS → MERN Stack.</li>
              <li>NextJS, Sanity → Jamstack.</li>
              <li>TailwindCSS, Typescript.</li>
              <li>RESTful services.</li>
              <li>Integration with email marketing tools like Mailchimp and SendGrid.</li>
              <li>Embedding posts from Instagram, TikTok, Twitter, Youtube, etc.</li>
              <li>E-commerce with Stripe API.</li>
            </ul>
            <p className="text-base mt-4 leading-relaxed sm:leading-loose">
              I've switched from MERN to Jamstack because NextJS and Sanity are the best tool available in 2021. They are using cloud technologies, the development process is much faster, maintenance low, and scaling easier and cheaper.
            </p>
            <p className="text-base mt-4 leading-relaxed sm:leading-loose">
              NextJS makes blazing fast websites and Sanity is a content storage with a content management system so an editor can make change to the content, for example upload a new blog post, without the help of a developer.
            </p>
            <p className="text-base mt-4 leading-relaxed sm:leading-loose">
              If you have any questions, feel free to contact me by email or through my social accounts.</p>
          </div>
        </div>
        <div className="max-w-screen-md mx-auto">
          <h2 id="contact" className="pt-24 mt-24 text-3xl sm:text-4xl lg:text-5xl text-center font-bold">Contact</h2>
          <div className="mt-12 sm:mt-24">
            <ContactForm />
          </div>
          <div className="flex items-center mt-12">
            <div className="flex-1 border-b"></div>
            <h2 className="px-4 font-semibold text-xl uppercase">or</h2>
            <div className="flex-1 border-b"></div>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center sm:items-start sm:space-x-10">
            <a rel="noreferrer noopener" href={`https://www.twitter.com/${TWITTER_ID}`} className="rounded-full w-16 h-16 border border-blue-400 flex justify-center items-center text-blue-400 hover:bg-blue-400 focus:bg-blue-400 hover:text-white focus:text-white transition-colors duration-200">
              <ImTwitter className="w-5 h-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">
              My main account. I enjoy sharing my journey and interacting with tech Twitter. Learnt a lot and made great friends.</p>
            <a rel="noreferrer noopener" href={`https://www.linkedin.com/${LINKEDIN_ID}`} className="rounded-full w-16 h-16 border border-blue-600 flex justify-center items-center text-blue-600 hover:bg-blue-600 focus:bg-blue-600 hover:text-white focus:text-white transition-colors duration-200">
              <FaLinkedinIn className="w-5 h-5" />
              <span className="sr-only">Linkedin</span>
            </a>
            <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">Less casual, more developer blog and projects posts.</p>
            <a rel="noreferrer noopener" href={`https://www.instagram.com/${INSTAGRAM_ID}`} className="rounded-full w-16 h-16 border border-red-400 flex justify-center items-center text-red-400 hover:bg-red-400 focus:bg-red-400 hover:text-white focus:text-white transition-colors duration-200">
              <FiInstagram className="w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">I've used Instagram mostly as a gallery for past projects.</p>
            <a href={`mailto:${MAIL}`} className="rounded-full w-16 h-16 border border-black flex justify-center items-center text-black hover:bg-black focus:bg-black hover:text-white focus:text-white transition-colors duration-200">
              <HiOutlineMail className="w-5 h-5" />
              <span className="sr-only">Mail</span>
            </a>
            <p className="sm:hidden leading-relaxed mt-4 mb-16 text-center max-w-xs">Good old email. </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 mt-28 sm:mt-48 border-t sm:border-t-0">
        <Newsletter />
      </div>
    </MyMainLayout>
  )
}

export default Home