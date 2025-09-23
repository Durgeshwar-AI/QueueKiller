import { Route, Routes } from "react-router-dom";
import CreateSchedule from "./pages/CreateSchedule";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Routes>
        <Route path="/" element={<CreateSchedule />}/>
      </Routes>
    </div>
  );
};

export default App;
