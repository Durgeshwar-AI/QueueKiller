import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between p-4 px-8 fixed top-0 bg-white z-10">
      <div className="text-lg flex gap-2 justify-center items-center">
        <span className="bg-indigo-600 text-white p-2 rounded-xl">
          <Calendar />
        </span>
        <span className="text-xl font-semibold">QueueKiller</span>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Link to="/signup"><span className="font-semibold hover:bg-indigo-100 duration-150 hover:text-indigo-500 p-2 px-8 rounded-xl">SignIn</span></Link>
        <Link to="/signup">
          <button className="group flex text-white bg-gradient-to-r from-[#4746e7] to-indigo-600 hover:from-[#4746e7]/90 hover:to-indigo-600/90 p-2 rounded-xl items-center justify-center">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
