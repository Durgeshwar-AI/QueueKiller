import { Route, Routes } from "react-router-dom";
import BookSchedule from "./pages/BookSchedule";
import Scheduler from "./pages/Scheduler";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Routes>
        <Route path="/" element={<BookSchedule />}/>
        <Route path="/schedule" element={<Scheduler/>}/>
      </Routes>
    </div>
  );
};

export default App;
