import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

const App = () => {
  const isLoggedIn = true;
  return (
    <Routes>
      {!isLoggedIn ? (
        <Route path="/" element={<Login />} />
      ) : (
        <Route path="/" element={<Home />} />
      )}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default App;
