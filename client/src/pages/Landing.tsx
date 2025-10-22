import Hero from '../components/Landing/Hero'
import Services from '../components/Landing/Services'

const Landing = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <Hero/>
        <Services/>
    </div>
  )
}

export default Landing