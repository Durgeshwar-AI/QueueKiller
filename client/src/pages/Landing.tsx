import { Footer } from '../components/Footer'
import Hero from '../components/Landing/Hero'
import JoinUs from '../components/Landing/JoinUs'
import Services from '../components/Landing/Services'
import Trust from '../components/Landing/Trust'
import Navbar from '../components/Navbar'

const Landing = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <Navbar/>
        <Hero/>
        <Services/>
        <Trust/>
        <JoinUs/>
        <Footer/>
    </div>
  )
}

export default Landing