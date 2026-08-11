import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../utils/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Clear error when user starts correcting the field
    setErrors((previous) => ({
      ...previous,
      [name]: "",
      general: "",
    }));
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain an uppercase letter.";
    }

    if (!/[a-z]/.test(password)) {
      return "Password must contain a lowercase letter.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain a number.";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain a special character.";
    }

    return "";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else {
      newErrors.password = validatePassword(formData.password);
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (newErrors.username || newErrors.password || newErrors.confirmPassword) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors(newErrors);

      await register(formData.username, formData.password);

      toast.success("Account created successfully.");

      navigate("/login");
    } catch (error) {
      const message =
        error.response?.data?.detail || "Unable to create account.";

      if (
        message.toLowerCase().includes("already") ||
        message.toLowerCase().includes("exists")
      ) {
        setErrors((previous) => ({
          ...previous,
          username: "This username is already registered.",
        }));
      } else {
        setErrors((previous) => ({
          ...previous,
          general: "Unable to create account. Please try again.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="font-raleway text-2xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-1 font-voces text-sm text-secondary">
          Register to access ScholarStats.
        </p>

        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-3 outline-none focus:border-primary"
            />
            {errors.username && (
              <p className="mt-1.5 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-3 outline-none focus:border-primary"
            />

            {errors.password ? (
              <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-500">
                Minimum 8 characters with uppercase, lowercase, number and
                special character.
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3.5 py-3 outline-none focus:border-primary"
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors.general && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-bold text-white disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full text-sm font-bold text-primary"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
