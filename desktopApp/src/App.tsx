import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const isLoggedIn = true;
  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="/" element={<Login />} />
      ) : (
        <Route path="/" element={<Home />} />
      )}
    </Routes>
  );
};

export default App;
