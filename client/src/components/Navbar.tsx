import { Building2, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((s) => s.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Navbar - isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const currentPath = location.pathname

  return (
    <div className="flex justify-between w-full items-center p-4 shadow-md">
      {/* Logo */}
      <Link to='/'>
        <div className="text-lg flex gap-2 justify-center items-center cursor-pointer">
          <span className="bg-indigo-600 text-white p-2 rounded-xl">
            <Calendar />
          </span>
          <span className="text-xl font-semibold">QueueKiller</span>
        </div>
      </Link>

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
      ) : (
        <div className="flex gap-4">
          <Link to="department">
            <button className={`group flex text-black bg-gradient-to-r ${currentPath === "/book" ? "from-[#4746e7] to-indigo-600 text-white" : ""} hover:from-[#4746e7]/90 hover:to-indigo-600/90 hover:text-white p-2 px-6 rounded-xl items-center justify-center gap-2`}>
              <Building2 className="w-6 h-6"/><span>Departments</span>
            </button>
          </Link>
          <Link to="profile">
            <button className={`group flex text-black bg-gradient-to-r ${currentPath === "/profile" ? "from-[#4746e7] to-indigo-600 text-white" : ""} hover:from-[#4746e7]/90 hover:to-indigo-600/90 hover:text-white p-2 px-6 rounded-xl items-center justify-center gap-2`}>
              <User className="w-6 h-6"/><span>Profile</span>
            </button>
          </Link>
          <button className="group flex text-black hover:text-white bg-gradient-to-r hover:from-[#e74647]/90 hover:to-red-600/90 p-2 px-6 rounded-xl items-center justify-center gap-2 transition-all duration-150" onClick={() => dispatch(logout())}>
            <ArrowRight /><span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
