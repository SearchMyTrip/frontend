import React, { useState, useEffect } from "react";
import "../styles/pages/Login.css";
import { Link } from "react-router-dom";
import { backendUrl } from "../utils/config";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const res = await fetch(`${backendUrl}/auth/signin`, options);
    const data = await res.json();
    if (data.success === false) return toast.error(data.error);
    toast.success("Login successful.");
    localStorage.setItem("token", data.data.token);
    setTimeout(() => {
      window.location.assign("/");
    }, 1000);
  };

  return (
    <>
      <div className="login-form-main-wrapper">
        <div className="img-container">
          <img src="./login_image.svg" alt="login art" />
        </div>
        <div className="login-form-container">
          <div className="login-form">
            <h3 className="org-name">Traverse</h3>
            <input
              type="email"
              className="input-email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className=" submit-btn" onClick={handleLogin}>
              Login
            </button>
            <div className="hr-container">
              <hr className="or-hr" data-content="OR" />
            </div>

            <button type="submit" className="submit-btn">
              <i className="bi bi-facebook"></i> Login with Facebook
            </button>

            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
          <div className="signup-div">
            <p>
              Don't have account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <footer>
        <div className="bottom-main">Copyright &copy; Traverse.com.np</div>
      </footer>
    </>
  );
};

export default Login;
