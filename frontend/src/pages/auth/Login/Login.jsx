import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, LogIn, User } from "lucide-react";
import { toast } from "react-toastify";
import { login } from "../../../utils/authService";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
    };
    if (!username.trim()) {
      newErrors.username = "Username or email is required.";
    }
    if (password.length === 0) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoggingIn(true);
      await login(username.trim(), password);
      toast.success("Login successful! Welcome to ScholarStats.");
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);

      if (!error.response) {
        toast.error(
          "Unable to connect to the server. Please check your connection.",
        );
        return;
      }

      toast.error(
        error.response?.data?.detail || "Invalid username or password.",
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 font-biryani">
      <div className="w-full max-w-[420px]">
        <div className="rounded-xl border border-gray-300 bg-white px-7 py-8 shadow-sm sm:px-8">
          {/* Branding */}
          <div className="mb-7 text-center">
            <h1 className="font-raleway text-3xl font-extrabold tracking-tight text-primary">
              ScholarStats
            </h1>

            <p className="mt-1 font-voces text-sm text-secondary">
              Academic Result Analyzer
            </p>
          </div>

          {/* Page heading */}
          <div className="mb-6 text-center">
            <h2 className="font-raleway text-xl font-bold text-gray-900">
              Login to Dashboard
            </h2>

            <p className="mt-1 font-voces text-sm text-secondary">
              Enter your admin credentials to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" noValidate>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Username or Email
              </label>

              <div
                className={`flex items-center gap-3 rounded-lg border bg-white px-3.5 py-3 transition ${
                  errors.username
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-blue-100"
                }`}
              >
                <User size={18} className="shrink-0 text-gray-500" />

                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  placeholder="Enter username or email"
                  autoComplete="username"
                  disabled={isLoggingIn}
                  aria-invalid={Boolean(errors.username)}
                  aria-describedby={
                    errors.username ? "username-error" : undefined
                  }
                  onChange={(event) => {
                    setUsername(event.target.value);

                    if (errors.username) {
                      setErrors((previous) => ({
                        ...previous,
                        username: "",
                      }));
                    }
                  }}
                  className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-500"
                />
              </div>

              {errors.username && (
                <p
                  id="username-error"
                  className="mt-1.5 text-xs font-semibold text-red-600"
                >
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-gray-700"
              >
                Password
              </label>

              <div
                className={`flex items-center gap-3 rounded-lg border bg-white px-3.5 py-3 transition ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-blue-100"
                }`}
              >
                <Lock size={18} className="shrink-0 text-gray-500" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  disabled={isLoggingIn}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (errors.password) {
                      setErrors((previous) => ({
                        ...previous,
                        password: "",
                      }));
                    }
                  }}
                  className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:text-gray-500"
                />

                <button
                  type="button"
                  disabled={isLoggingIn}
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p
                  id="password-error"
                  className="mt-1.5 text-xs font-semibold text-red-600"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white transition hover:bg-[#0069d9] focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={19} />
                  Login
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
