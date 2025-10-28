import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  };

  return (
    <div className="w-screen min-h-[calc(100vh-4rem)] py-12 bg-gray-200 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="mb-2 text-3xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="bg-gray-100 p-4 py-2 rounded-lg"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="bg-gray-100 p-4 py-2 rounded-lg"
              />
            </div>
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
              className="bg-gray-100 p-4 py-2 rounded-lg"
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
              className="bg-gray-100 p-4 py-2 rounded-lg"
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
              className="bg-gray-100 p-4 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:underline"
            >
              Sign in
            </button>
          </p>
          <p className="text-muted-foreground">
            <button
              onClick={() => navigate("/company-login")}
              className="text-primary hover:underline"
            >
              Company Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
