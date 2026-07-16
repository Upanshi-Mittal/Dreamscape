import './home.css';
import React from 'react';
import { Link } from "react-router-dom";

export default function Header({ showSignup, onSignupClick, showLogin }) {
    return (
        <div className="w-full flex justify-center " style={{ margin: "20px 0 0 0" }}>
            <div className="flex justify-between w-[80%] items-center ">

                <h1 className="logo">Paperplane</h1>

                <div className={`nav ${showSignup || showLogin
                    ? "opacity-0 translate-x-10 pointer-events-none"
                    : "opacity-100 translate-x-0"
                    }`}
                >
                    <Link to="/explore">
                        Explore
                    </Link>

                    <Link to="/write">
                        Write
                    </Link>

                    <Link to="/about">
                        About
                    </Link>
                </div>

                <div className="border min-w-[30px] rounded-full hover:bg-black hover:text-white transition-all duration-500" style={{ padding: "8px 20px" }}>
                    <button className={`${showSignup || showLogin
                        ? "opacity-0 translate-x-10 pointer-events-none"
                        : "opacity-100 translate-x-0"
                        }`} onClick={onSignupClick}>
                        Sign In
                    </button>
                </div>

            </div>

        </div>
    );
}
