import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import AddCompany from "./pages/company/AddCompany";
import Companies from "./pages/company/Companies";
import Company from "./pages/company/Company";
import { useAppSelector } from "./hooks/reduxHooks";

const App = () => {
  const { isLoggedIn } = useAppSelector((s) => s.auth);

  return (
    <div className="flex h-screen">
      <Routes>
        {!isLoggedIn && <Route path="/login" element={<Login />} />}
        {isLoggedIn && (
          <>
            {<Sidebar />}
            <div className="flex-1 overflow-auto">
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/company/:id" element={<Company />} />
              <Route path="/addcompany" element={<AddCompany />} />
            </div>
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
