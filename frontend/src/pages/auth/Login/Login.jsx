import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, LogIn, Info } from "lucide-react";
import "../../../App.css";
import "./Login.css";
import Footer from "../../../components/common/Footer";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Username or email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      navigate("/dashboard");
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-body">
        <div className="login-card">
          <div className="login-header">
            <h1>ScholarStats</h1>
            <p>Pokhara University - Academic Portal</p>
          </div>

          <div className="login-title">
            <h2>User Login</h2>
            {/* <p>Enter your credentials</p> */}
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Username / Email</label>
              <div className="input-box">
                <User size={20} />
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-box">
                <Lock size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="**************"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>

              <button type="button" className="forgot-password">
                Forgot Password?
              </button>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
