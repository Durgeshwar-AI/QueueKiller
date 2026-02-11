import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Departments from "./pages/Departments";
import Schedules from "./pages/Schedules";
import Bookings from "./pages/Bookings";
import Settings from "./pages/Settings";

const App = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </>
      )}
    </Routes>
  );
};

export default App;
