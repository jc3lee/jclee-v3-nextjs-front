interface Props {
  title: string,
  imgSrc: string,
  name: string,
  intro: string[],
  skills: string[],
  outro: string[],
  className?: string,
}

const About = ({ imgSrc, className, title, intro, name, outro, skills, }: Props) => {
  return (
    <div className={`${className} max-w-screen-md mx-auto`}>
      <h2 id="about" className="pt-24 mt-24 text-3xl sm:text-4xl lg:text-5xl text-center font-bold">{title}</h2>
      <div className="w-24 h-24 sm:w-40 sm:h-40 rounded-full mx-auto mt-16 sm:mt-28">
        <img className="object-cover rounded-full" src={imgSrc} alt={name} />
      </div>
      <p className="mt-2 sm:mt-4 text-xl sm:text-2xl lg:text-3xl text-center font-bold">{name}</p>
      <div className="mt-4 sm:mt-8">
        {intro.map((text, index) => <p key={index} className="text-base leading-relaxed sm:leading-loose">{text}</p>)
        }
        <ul className="list-inside list-disc sm:mt-2">
          {skills.map((text, index) => <li key={index} className="text-base leading-relaxed sm:leading-loose">{text}</li>)
          }
        </ul>
        {outro.map((text, index) => <p key={index} className="text-base leading-relaxed sm:leading-loose">{text}</p>)
        }
      </div>
    </div >
  )
}

export default About