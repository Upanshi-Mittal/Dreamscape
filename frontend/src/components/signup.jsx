import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { handleerror, handlesuccess } from "../utils";


function Signup({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [signinfo, setsigninfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("Signup Info Updated:", signinfo);
  }, [signinfo]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setsigninfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = signinfo;

    if (!name || !email || !password) {
      return handleerror("All fields are required ⚠️");
    }

    const url = "http://localhost:8080/auth/signup";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinfo),
      });

      const result = await response.json();
      const { success, jwtToken,message, error } = result;

      if (success) {
        if (jwtToken) {
        localStorage.setItem("token", jwtToken);
      }
        handlesuccess("Signup successful 🎉");
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate("/final");
        }, 1000);
      } else {
        handleerror(error || message || "Signup failed 😵‍💫");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      handleerror("Something went wrong. Try again later 🚨");
    }
  };

  return (
    <div className="container">
      <div className="left"></div>
      <div className="overlay" >
          <div className="inner-box">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="page" style={{fontSize:"50px"}}>Sign Up</h2>

        <div className="details">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="e.g. star_coder"
            value={signinfo.name}
            onChange={handleInput}
            autoFocus
          />
        </div>

        <div className="details">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            value={signinfo.email}
            onChange={handleInput}
          />
        </div>

        <div className="details">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={signinfo.password}
            onChange={handleInput}
          />
        </div>

        <button type="submit">Sign Up</button>

        <span style={{ marginTop: '10px' }}>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      </div>
      </div>
      <div className="right"></div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
