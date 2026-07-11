import React, { useState, useEffect } from "react";
import { handleerror, handlesuccess } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./home.css";
function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [loginfo, setloginfo] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setloginfo((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log("loginfo updated:", loginfo);
  }, [loginfo]); // Now actually runs when loginfo updates

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginfo;

    if (!email || !password) {
      return handleerror("All fields are required ⚠️");
    }

    const url = "http://localhost:8080/auth/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginfo),
      });

      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (!success) {
        return handleerror(message || "Login failed 😵");
      }

      handlesuccess("Logged in successfully 🚀");
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("name", name);
      setIsAuthenticated(true);

      setTimeout(() => {
        navigate("/final");
      }, 1000);
    } catch (error) {
      handleerror("Something went wrong 💀");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex  h-full justify-center items-center" >
      
        <form className="form flex flex-col justify-center h-full" onSubmit={handleSubmit}>
          <div className="uppercase">welcome back</div>
          <h2 className="page"> Pick up where you left off</h2>
          <div className="details">
            <div>
              <label htmlFor="email">Email</label>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={loginfo.email}
              onChange={handleInputChange}
            />
            <hr />
          </div>

          <div className="details">
            <div>
              <label className="password" htmlFor="password">Password</label>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="•••••••"
              value={loginfo.password}
              onChange={handleInputChange}
            />
            <hr />
          </div>

          <button type="submit" style={{ marginTop: "10px" }} className="login">
            Login
          </button>

          <span style={{ fontsize: "15px", display: "block", marginTop: "12px" }}>
            New here? Start your first page <Link to="/signup" style={{ colour: "#f3f1edff" }}>Sign up</Link>
          </span>
        </form>
      <div className="w-[55%] bg-red-500"></div>
      <ToastContainer />

    </div>
  );
}

export default Login;
