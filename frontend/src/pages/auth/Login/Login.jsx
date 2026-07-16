import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { toast } from "react-toastify";
import { login } from "../../../utils/authService";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username.trim()) {
      toast.warning("Username or email is required.");
      return;
    }

    if (!password.trim()) {
      toast.warning("Password is required.");
      return;
    }

    try {
      const data = await login(username, password);

      if (rememberMe) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("username", username);
      } else {
        sessionStorage.setItem("token", data.access_token);
        sessionStorage.setItem("username", username);
      }
      toast.success("Login successful! Welcome to ScholarStats.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Invalid username or password.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center px-4 font-biryani">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 px-8 py-10">
          <div className="text-center mb-8">
            <h1 className="font-raleway text-4xl font-extrabold text-primary tracking-tight">
              ScholarStats
            </h1>

            <p className="font-voces mt-2 text-sm text-secondary">
              Academic Result Analyzer
            </p>
          </div>

          <div className="mb-7 text-center">
            <h2 className="font-raleway text-2xl font-bold text-gray-900">
              Login to Dashboard
            </h2>

            <p className="font-voces mt-1 text-sm text-secondary">
              Enter your admin credentials to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Username / Email
              </label>

              <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-blue-100 transition">
                <User size={20} className="text-secondary" />

                <input
                  type="text"
                  placeholder="Enter username or email"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password
              </label>

              <div className="flex items-center gap-3 border border-gray-300 rounded-xl px-4 py-3 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-blue-100 transition">
                <Lock size={20} className="text-secondary" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="w-full outline-none text-sm text-gray-800 placeholder:text-gray-400"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-secondary hover:text-gray-800 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-secondary">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-primary"
                />
                Remember me
              </label>

              {/* <button
                type="button"
                className="font-bold text-primary hover:underline"
              >
                Forgot password?
              </button> */}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-white font-bold shadow-lg shadow-blue-200 hover:bg-[#0069d9] transition"
            >
              <LogIn size={20} />
              Login
            </button>
          </form>
        </div>

        <p className="font-voces text-center text-xs text-secondary mt-5">
          © 2026 ScholarStats. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
