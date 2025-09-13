import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Routes >
        <Route path="/" element={<Landing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
