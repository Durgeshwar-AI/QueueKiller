import { Route, Routes } from "react-router-dom";
import BookSchedule from "./pages/BookSchedule";
import Scheduler from "./pages/Scheduler";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/book" element={<BookSchedule />}/>
        <Route path="/schedule" element={<Scheduler/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
};

export default App;
