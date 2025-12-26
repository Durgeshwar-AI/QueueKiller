import { Route, Routes } from "react-router-dom";
import BookSchedule from "./pages/BookSchedule";
import Scheduler from "./pages/Scheduler";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { login } from "./redux/auth/authSlice";
import Departments from "./pages/Departments";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./components/Dashboard/Profile";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(
        login({
          token,
          name: localStorage.getItem("name") || "",
          role: localStorage.getItem("role") || "user",
        })
      );
    }
  }, [dispatch]);

  const { isLoggedIn } = useAppSelector((s) => s.auth);

  return (
    <div className="flex flex-col min-h-screen relative">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/terms" element={<TermsOfService/>}/>
        {isLoggedIn && (
          <>
            <Route path="/book" element={<BookSchedule />} />
            <Route path="/department" element={<Departments />} />
            <Route path="/profile" element={<Profile/>}/>
          </>
        )}
        {<Route path="/schedule" element={<Scheduler />} />}
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
