import React, { useState, useEffect } from "react";
import "../styles/pages/Signup.css";
import { Link } from "react-router-dom";
import { backendUrl } from "../utils/config";
import { toast } from "react-toastify";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        full_name,
        phone_number,
        address,
        role,
        gender,
        email,
        password,
      }),
    };

    const res = await fetch(`${backendUrl}/auth/signup`, options);
    const data = await res.json();
    if (data.success === false) return toast.error(data.error);
    toast.success("User created successfully");
    localStorage.setItem("token", data.data.token);
    setTimeout(() => {
      window.location.assign("/");
    });
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
              type="text"
              placeholder="Full Name"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="number"
              placeholder="Phone number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address: City ,Country"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <select
              name="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Select Role</option>
              <option value="user">User</option>
              <option value="user">Guide</option>
            </select>
            <select
              name="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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

            <button
              type="submit"
              className=" submit-btn"
              onClick={handleSignup}
            >
              Signup
            </button>
            <div className="hr-container">
              <hr className="or-hr" data-content="OR" />
            </div>

            <button type="submit" className="submit-btn">
              <i className="bi bi-facebook"></i> Signup with Facebook
            </button>
          </div>
          <div className="signup-div">
            <p>
              Already have an account ? <Link to="/login">Login</Link>
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

export default Signup;
