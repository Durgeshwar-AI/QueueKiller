import React, { useState } from "react";
import { adminLogin } from "../redux/auth/authSlice";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await dispatch(
        adminLogin({
          email: formData.email,
          password: formData.password,
        }),
      ).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setErrors({ password: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-2xl p-12 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : ""
              }`}
              disabled={isLoading}
            />
            {errors.email && (
              <span className="text-sm text-red-500 font-medium">
                {errors.email}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`px-4 py-3 border-2 border-gray-200 rounded-lg text-base transition-all focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : ""
              }`}
              disabled={isLoading}
            />
            {errors.password && (
              <span className="text-sm text-red-500 font-medium">
                {errors.password}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-lg text-base font-semibold cursor-pointer transition-all mt-2 uppercase tracking-wider hover:shadow-lg hover:scale-105 active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="#/forgot-password"
            className="text-sm text-blue-500 font-medium transition-colors hover:text-purple-600 hover:underline"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
