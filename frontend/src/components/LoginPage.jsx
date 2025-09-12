import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json"; // adjust path if needed
import "../styles/LoginPage.css"; // import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate("/home");
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
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
              onClick={handleGoogleLogin}
              className="google-btn"
            >
              <span>Log in with Google</span>
            </button>

                      </form>
        </div>
      </div>
    </div>
  );
};

export default Login;