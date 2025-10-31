import { Calendar} from 'lucide-react'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between p-4 px-8 fixed top-0 bg-white z-10'>
        <div className='text-lg flex gap-2 justify-center items-center'>
            <Calendar/>
            <span className='text-xl font-semibold'>QueueKiller</span>
        </div>
        <div className='flex gap-4 justify-center items-center'>
            <a href="">Login</a>
            <button className='bg-black text-white p-2 px-4 rounded-xl'>Sign Up</button>
        </div>
    </div>
  )
}

export default Navbar