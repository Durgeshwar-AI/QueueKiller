import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import type { RootState } from "../redux/store";
import { signup } from "../redux/auth/authSlice";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s: RootState) => s.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // dispatch signup thunk
    dispatch(signup({ name, email, password }))
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
            <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
            <p className="text-muted-foreground">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" aria-label="signup form">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="firstName">Full Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white p-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

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

            <div className="space-y-2 flex flex-col">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-white p-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
            {error && (
              <p className="text-red-600 text-sm mt-2">{String(error)}</p>
            )}
          </form>

          <div className="mt-6 text-center space-y-4">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 hover:underline"
              >
                Login
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

export default Signup;
