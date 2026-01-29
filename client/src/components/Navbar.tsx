import { Menu, X, LogOut, Home, Settings, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";

const Navbar = () => {
  const { isLoggedIn } = useAppSelector((s) => s.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Navbar - isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
    closeMobileMenu();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <div className="flex gap-2 items-center cursor-pointer group">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-indigo-500/30 transition-all">
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Queue<span className="text-indigo-600">Killer</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {isLoggedIn && (
                <div className="flex items-center gap-2 mr-4">
                  <Link to="/">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Home className="w-4 h-4" />
                      <span className="text-sm font-medium">Home</span>
                    </button>
                  </Link>
                  <Link to="/department">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <BarChart3 className="w-4 h-4" />
                      <span className="text-sm font-medium">Departments</span>
                    </button>
                  </Link>
                  <Link to="/profile">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Profile</span>
                    </button>
                  </Link>
                </div>
              )}

              {!isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Link to="/login">
                    <button className="px-4 py-2 text-gray-600 hover:text-indigo-600 font-medium rounded-lg transition-colors">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all">
                      Get Started
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-2">
              {isLoggedIn && (
                <>
                  <Link to="/" onClick={closeMobileMenu}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all">
                      <Home className="w-5 h-5" />
                      <span>Home</span>
                    </button>
                  </Link>
                  <Link to="/department" onClick={closeMobileMenu}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all">
                      <BarChart3 className="w-5 h-5" />
                      <span>Departments</span>
                    </button>
                  </Link>
                  <Link to="/profile" onClick={closeMobileMenu}>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all">
                      <Settings className="w-5 h-5" />
                      <span>Profile</span>
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <Link to="/login" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all font-medium">
                      Sign In
                    </button>
                  </Link>
                  <Link to="/signup" onClick={closeMobileMenu}>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-medium">
                      Get Started
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
