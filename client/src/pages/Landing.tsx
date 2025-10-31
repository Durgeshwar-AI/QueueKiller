import Hero from '../components/Landing/Hero'
import Services from '../components/Landing/Services'
import Navbar from '../components/Navbar'

const Landing = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <Navbar/>
        <Hero/>
        <Services/>
    </div>
  )
}

export default Landing