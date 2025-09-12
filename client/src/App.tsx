import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Booking from "./pages/Booking";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Routes >
        <Route path="/" element={<Landing />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </div>
  );
};

export default App;
