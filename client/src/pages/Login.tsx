import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import type { RootState } from "../redux/store";
import { loginUser } from "../redux/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s: RootState) => s.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch login thunk
    console.log(email, password)
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err: unknown) => {
        // error is already in slice; show alert optionally
        console.error("Signup failed", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="w-screen pt-[100px] py-24 bg-gray-200 flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="mb-2 text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">Log in to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Already have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 hover:underline"
              >
                Signup
              </button>
            </p>
            <p className="text-muted-foreground">
              <button
                onClick={() => navigate("/company-login")}
                className="text-blue-500 hover:underline"
              >
                Company Login
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
