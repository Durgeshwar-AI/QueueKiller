import { Building2, Calendar, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((s) => s.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Navbar - isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const currentPath = location.pathname;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex gap-2 items-center cursor-pointer group">
                <span className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </span>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  QueueKiller
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {!isLoggedIn ? (
              <div className="hidden md:flex gap-3 items-center">
                <Link to="/login">
                  <span className="font-semibold hover:bg-indigo-50 duration-150 hover:text-indigo-600 py-2 px-6 rounded-xl cursor-pointer transition-colors">
                    Sign In
                  </span>
                </Link>
                <Link to="/signup">
                  <button className="group flex text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 py-2 px-6 rounded-xl items-center justify-center font-medium shadow-lg shadow-indigo-500/30 transition-all">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex gap-3">
                <Link to="/department">
                  <button
                    className={`group flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium transition-all ${
                      currentPath === "/department"
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    <span>Departments</span>
                  </button>
                </Link>
                <Link to="/profile">
                  <button
                    className={`group flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-medium transition-all ${
                      currentPath === "/profile"
                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                </Link>
                <button
                  className="group flex items-center justify-center gap-2 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 py-2 px-4 rounded-xl font-medium transition-all duration-150 hover:shadow-lg hover:shadow-red-500/30"
                  onClick={() => dispatch(logout())}
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex gap-2 items-center">
                <span className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-2 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </span>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  QueueKiller
                </span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <Link to="/login" onClick={closeMobileMenu}>
                    <button className="w-full text-left font-semibold hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 py-3 px-4 rounded-xl transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu}>
                    <button className="w-full flex items-center justify-center text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 py-3 px-4 rounded-xl font-medium shadow-lg shadow-indigo-500/30 transition-all">
                      Get Started
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link to="department" onClick={closeMobileMenu}>
                    <button
                      className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all ${
                        currentPath === "/department"
                          ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30"
                          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      <Building2 className="w-5 h-5" />
                      <span>Departments</span>
                    </button>
                  </Link>
                  <Link to="profile" onClick={closeMobileMenu}>
                    <button
                      className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl font-medium transition-all ${
                        currentPath === "/profile"
                          ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/30"
                          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      <User className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                  </Link>
                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <button
                      className="w-full flex items-center gap-3 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 py-3 px-4 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-red-500/30"
                      onClick={() => {
                        dispatch(logout());
                        closeMobileMenu();
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 text-center">
                © 2025 QueueKiller. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
