import { Route, Routes } from "react-router-dom";
import BookSchedule from "./pages/BookSchedule";
import Scheduler from "./pages/Scheduler";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { login, logout } from "./redux/auth/authSlice";
import Departments from "./pages/Departments";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./components/Dashboard/Profile";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import HowItWorks from "./pages/HowItWorks";
import axios from "axios";
import CompanyLogin from "./pages/CompanyLogin";
import CompanyDashboard from "./pages/CompanyDashboard";

const URL = process.env.API_URL;

const App = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, accountType } = useAppSelector((s) => s.auth);
  const [hasPinged, setHasPinged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const ping = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/user/auth/ping`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(
          login({
            token: data.token,
            name: data.name,
            accountType: "user",
          }),
        );
      } catch (err) {
        console.log(err);
        localStorage.clear();
        dispatch(logout());
      }
      setHasPinged(true);
    };

    if (!hasPinged) ping();
  }, [dispatch, hasPinged]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookie" element={<CookiePolicy />} />
        <Route path="/guide" element={<HowItWorks />} />
        {isLoggedIn && accountType === "user" && (
          <>
            <Route path="/book" element={<BookSchedule />} />
            <Route path="/department" element={<Departments />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        {<Route path="/schedule" element={<Scheduler />} />}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/company-login" element={<CompanyLogin />} />
          </>
        )}
        <Route path="/company" element={<CompanyDashboard/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
