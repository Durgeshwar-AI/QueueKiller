import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="w-screen min-h-[calc(100vh-4rem)] py-12 bg-gray-200 flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="mb-2 text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
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
              className="bg-gray-100 p-4 py-2 rounded-lg"
            />
          </div>

          <button type="submit" className="w-full bg-black text-white p-2 rounded-lg">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("signup")}
              className="text-primary hover:underline"
            >
              Sign up
            </button>
          </p>
          <p className="text-muted-foreground">
            <button
              onClick={() => navigate("company-login")}
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

export default Login;
