import React, { useState, useEffect } from "react";
import { handleerror, handlesuccess } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./home.css";

function LoginPanel({ isOpen, onClose, setIsAuthenticated , onSignupClick}) {
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
    <div className="flex items-center" style={{ margin: "30px" }} >

      <div
        onClick={onClose}
        className={` flex fixed inset-0 transition-opacity duration-500
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} style={{ margin: "30px" }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 left-0 h-screen w-[42%] bg-[#FAF7F2]
  transition-all duration-[900ms]
  ease-[cubic-bezier(0.22,1,0.36,1)]
  shadow-2xl
  ${isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute right-10 top-10 text-4xl hover:rotate-90 transition-all duration-500"
        >
          ×
        </button>

        <form className="form flex flex-col justify-center h-full" onSubmit={handleSubmit}>
          <div className="uppercase tracking-[6px] text-[#B8AEE8] text-sm mb-6">Welcome back</div>
          <div className="font-serif text-[42px] leading-[1.05] mb-16" style={{marginBottom:"16px"}}>Pick up where you left off</div>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={loginfo.email}
              onChange={handleInputChange} className="w-full
        bg-transparent
        outline-none
        text-xl
        placeholder:text-neutral-300
        font-serif"
              autoFocus
            />
            <div className="h-px bg-neutral-400 mt-4" />
          </div>

          <div style={{ marginBottom: "12px" }}>
              <label className="password" htmlFor="password" className="block text-xl text-neutral-600 mb-3">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="•••••••"
              value={loginfo.password}
              onChange={handleInputChange}
              className="w-full
        bg-transparent
        outline-none
        text-xl
        placeholder:text-neutral-300
        font-serif"
            />
            <div className="h-px bg-neutral-400 mt-4" />
          </div>

          <button type="submit" className="
mt-10
w-full
rounded-full
bg-[#181818]
text-white
py-5
text-xl
hover:scale-[1.02]
transition-all
duration-500"
            style={{ marginTop: "30px" }}>
            Login
          </button>

          <p className="mt-10 text-center text-neutral-500">
            New here? Start your first page 
            <button  className="text-black font-medium ml-2 hover:underline" onClick={() => {
  onClose();
  onSignupClick();}}>Sign up</button>
          </p>
        </form>
        <ToastContainer />

      </div>
    </div>
  );
}

export default LoginPanel;
