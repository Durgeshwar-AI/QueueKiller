import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
