import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((s) => s.auth);
  useEffect(() => {
    console.log("Navbar - isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="flex justify-between w-full items-center p-4 shadow-md">
      {/* Logo */}
      <div className="text-lg flex gap-2 justify-center items-center">
        <span className="bg-indigo-600 text-white p-2 rounded-xl">
          <Calendar />
        </span>
        <span className="text-xl font-semibold">QueueKiller</span>
      </div>

      {/* Right side buttons */}
      {!isLoggedIn ? (
        <div className="flex gap-4 justify-center items-center">
          <Link to="/login">
            <span className="font-semibold hover:bg-indigo-100 duration-150 hover:text-indigo-500 p-2 px-8 rounded-xl cursor-pointer">
              SignIn
            </span>
          </Link>

          <Link to="/signup">
            <button className="group flex text-white bg-gradient-to-r from-[#4746e7] to-indigo-600 hover:from-[#4746e7]/90 hover:to-indigo-600/90 p-2 px-6 rounded-xl items-center justify-center">
              Get Started
            </button>
          </Link>
        </div>
      ):(
        <div>
          <Link to="/book">
            <button className="group flex text-white bg-gradient-to-r from-[#4746e7] to-indigo-600 hover:from-[#4746e7]/90 hover:to-indigo-600/90 p-2 px-6 rounded-xl items-center justify-center">
              Book Appointment
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
