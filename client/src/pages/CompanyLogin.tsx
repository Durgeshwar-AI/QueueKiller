import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import type { RootState } from "../redux/store";
import { login } from "../redux/auth/authSlice";

const API = process.env.API_URL;

const CompanyLogin = () => {
  const [key, setKey] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isLoggedIn } = useAppSelector(
    (s: RootState) => s.auth,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/company/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid key or password");
      }

      const data = await response.json();
      dispatch(
        login({
          token: data.token,
          name: data.company?.name || "Company",
          accountType: "company",
        }),
      );
      navigate("/dashboard");
    } catch (err) {
      console.error("Company login failed", err);
    }
  };

  if (isLoggedIn) {
    navigate("/dashboard");
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="w-screen pt-[100px] py-24 bg-gray-200 flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="mb-2 text-3xl font-bold">Company Login</h1>
            <p className="text-muted-foreground">
              Log in to your company account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-label="company login form"
          >
            <div className="space-y-2 flex flex-col">
              <label htmlFor="key">Company Key</label>
              <input
                id="key"
                type="text"
                placeholder="Enter your company key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
                className="bg-white p-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white p-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-600 text-sm mt-2">{String(error)}</p>
            )}
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-muted-foreground">
              Not a company?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline"
              >
                User Login
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanyLogin;
