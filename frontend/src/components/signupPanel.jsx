import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import { handleerror, handlesuccess } from "../utils";


function SignupPanel({ isOpen, onClose, setIsAuthenticated, showLogin, onLoginClick }) {
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
      const { success, jwtToken, message, error } = result;

      if (success) {
        if (jwtToken) {
          localStorage.setItem("token", jwtToken);
        }
        handlesuccess("Signup successful 🎉");
        //setIsAuthenticated(true);
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

    <div className="flex items-center" style={{ margin: "30px" }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={` flex fixed inset-0 transition-opacity duration-500
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`} style={{ margin: "30px" }}
      />


      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 right-0 h-screen w-[42%] bg-[#FAF7F2]
  transition-all duration-[900ms]
  ease-[cubic-bezier(0.22,1,0.36,1)]
  shadow-2xl
  ${isOpen
            ? "translate-x-0"
            : "translate-x-full"
          }`}
      >
        <button
          onClick={onClose}
          className="absolute right-10 top-10 text-4xl hover:rotate-90 transition-all duration-500"
        >
          ×
        </button>

          <form className="form flex flex-col justify-center h-full" onSubmit={handleSubmit}>


          <p className="uppercase tracking-[6px] text-[#B8AEE8] text-sm mb-6">
            BEGIN YOUR FIRST PAGE
          </p>




          <h1 className="font-serif text-[42px] leading-[1.05] mb-16">
            Create your account
          </h1>

          <div style={{ marginBottom: "12px" }}>

            <label htmlFor="name" className="block text-xl text-neutral-600 mb-3">Name</label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. star_coder"
              value={signinfo.name}
              onChange={handleInput}
              className="w-full
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
            <label htmlFor="email" className="block text-xl text-neutral-600 mb-3">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={signinfo.email}
              onChange={handleInput}
              className="w-full
        bg-transparent
        outline-none
        text-xl
        placeholder:text-neutral-300
        font-serif"
            />
            <div className="h-px bg-neutral-400 mt-4" />
          </div>

          <div style={{ marginBottom: "12px", marginRight: "5px" }}>

            <label htmlFor="password" className="block text-xl text-neutral-600 mb-3">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={signinfo.password}
              onChange={handleInput}
              className="w-full
        bg-transparent
        outline-none
        text-xl
        placeholder:text-neutral-300
        font-serif"
            />
            <div className="h-px bg-neutral-400 mt-4" />
          </div>

          <button
            className="
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
            style={{ marginTop: "30px" }}
          >
            Start writing →
          </button>
          <p className="mt-10 text-center text-neutral-500">

            Already have an account?

            <button
              className="text-black font-medium ml-2 hover:underline" onClick={() => {
  onClose();
  onLoginClick();
}}
            >
              Login
            </button>

          </p>
        </form>

      </div>
    </div>
  );
}

export default SignupPanel;
