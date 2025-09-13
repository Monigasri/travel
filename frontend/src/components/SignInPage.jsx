import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";
import "../styles/LoginPage.css";
import { useState } from "react";

const SignInPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, username, email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Registration failed");
        return;
      }
      navigate("/home");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-left-content">
          <div className="lottie-box">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
          <h2>Join the Journey</h2>
          <p>Create an account to start planning</p>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-card">
          <div className="login-header">
            <h1>Create your account</h1>
            <p>Continue with Google to get started</p>
          </div>

          <form className="login-form" onSubmit={handleRegister}>
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username (optional)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>

            <button
              type="button"
              onClick={() => { window.location.href = "http://localhost:5000/auth/google"; }}
              className="google-btn"
            >
              <span>Sign in with Google</span>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;