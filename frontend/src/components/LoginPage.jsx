import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json"; // adjust path if needed
import "../styles/LoginPage.css"; // import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    if (error) {
      setErrorMessage(error);
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(err.error || "Login failed");
      return;
    }
    navigate("/home");
  };

  return (
    <div className="login-container">
      {/* Left side animation instead of image */}
      <div className="login-left">
        <div className="login-left-content">
          <div className="lottie-box">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
          <h2>Explore the World</h2>
          <p>Your journey begins here</p>
        </div>
      </div>

      {/* Right side form */}
      <div className="login-right">
        <div className="login-form-card">
          <div className="login-header">
            <h1>Welcome Back!</h1>
            <p>Sign in to continue your travel planning</p>
            {errorMessage && (
              <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </div>
            )}
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">
              Log in
            </button>

            <div className="divider">
              <hr />
              <span>or</span>
              <hr />
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href = "http://localhost:5000/auth/google";
              }}
              className="google-btn"
            >
              <span>Log in with Google</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              Already have an account? If not, <Link to="/">create one</Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
