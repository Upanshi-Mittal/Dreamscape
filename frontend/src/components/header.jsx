import './home.css';
import React from 'react';
import { Link } from "react-router-dom";

// Move this into your global CSS (same as Blog.jsx) so it isn't
// re-injected every time Header mounts.
const FontImport = () => (
  <style>
    {`@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');`}
  </style>
);

export default function Header({ showSignup, onSignupClick, showLogin }) {
  const hidden = showSignup || showLogin;

  return (
    <div className="w-full flex justify-center" style={{ margin: "0" }}>
      <FontImport />
      <div
        className="flex justify-between items-center w-full"
        style={{ maxWidth: 1200, padding: "26px 48px" }}
      >
        <h1
          className="text-[#1C1B19]"
          style={{
            fontFamily: "'Caveat', cursive",
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1,
          }}
        >
          Paperplane
        </h1>

        <div
          className={`flex items-center transition-all duration-500 ${
            hidden
              ? "opacity-0 translate-x-10 pointer-events-none"
              : "opacity-100 translate-x-0"
          }`}
          style={{ gap: 30 }}
        >
          <Link
            to="/explore"
            className="text-[#6E6A61] hover:text-[#1C1B19] transition-colors"
            style={{ fontSize: 12 }}
          >
            Explore
          </Link>
          <Link
            to="/write"
            className="text-[#6E6A61] hover:text-[#1C1B19] transition-colors"
            style={{ fontSize: 12 }}
          >
            Write
          </Link>
          <Link
            to="/about"
            className="text-[#6E6A61] hover:text-[#1C1B19] transition-colors"
            style={{ fontSize: 12 }}
          >
            About
          </Link>
        </div>

        <div
          className="border border-[#1C1B19] rounded-full hover:bg-[#1C1B19] hover:text-[#FAF6EF] transition-all duration-500"
          style={{ padding: "7px 16px" }}
        >
          <button
            className={`text-[#1C1B19] hover:text-inherit transition-all duration-500 ${
              hidden
                ? "opacity-0 translate-x-10 pointer-events-none"
                : "opacity-100 translate-x-0"
            }`}
            style={{ fontSize: 12 }}
            onClick={onSignupClick}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}