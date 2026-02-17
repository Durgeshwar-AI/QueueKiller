import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import AddCompany from "./pages/company/AddCompany";
import Companies from "./pages/company/Companies";
import Company from "./pages/company/Company";

const App = () => {

  return (
    <div className="flex h-screen">
      { <Sidebar />}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/company/:id" element={<Company />} />
          <Route path="/addcompany" element={<AddCompany />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
