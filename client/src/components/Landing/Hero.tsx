import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import type { Auth } from '../../redux/authSlice.ts'

const Hero = () => {
  const { token } = useSelector((state: { auth: Auth }) => state.auth)

  return (
    <div className="relative w-full h-screen">
      <img
        src="/your-background.jpg"
        alt="QueueKiller Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to QueueKiller</h1>
        <p className="text-xl mb-8">Skip the lines, not the fun!</p>
        <Link
          to={token ? '/dashboard' : '/register'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Get Started
        </Link>
      </div>
    </div>
  )
}

export default Hero
