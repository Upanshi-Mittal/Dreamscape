import { Link } from "react-router-dom"
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify'
import './home.css'
import Header from './header';
import HeroPlane from "./Heroplane/heroplane";
import SignupPanel from './signupPanel'
import LoginPanel from './loginPanel'
function Home({setIsAuthenticated}) {
    const [showSignup, setShowSignup] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <Header showSignup={showSignup} showLogin={showLogin}
                onSignupClick={() => setShowSignup(true)} />
            <div className="app">
                <div className={`landing ${showSignup ? "landing-open" : ""} ${showLogin ? "login-open" : ""} `}>

                    <HeroPlane />
                    <div className={`overlay ${showSignup ? "" : "w-[100vw]"}`} >
                        {showLogin ? <>
                            <div>
                                Write sofly, Someone somewhere might need words.
                            </div>
                            <div>Your drafts are waiting.</div>

                        </> : <>
                            <div
                                className={`inner-box transition-all duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${showSignup
                                    ? "-translate-x-10 scale-[0.97]"
                                    : "translate-x-0 scale-100"
                                    }`}
                            >

                                <div > Some thoughts deserve more than a notes app.</div>

                                <h2>
                                    "Every paper plane begins as a blank page."
                                </h2>
                                <h4 className={`${showSignup
                                    ? "opacity-0 translate-x-10 pointer-events-none"
                                    : "opacity-100 translate-x-0"
                                    }`}>Fold your thoughts. let them travel.
                                </h4>
                                <div className={`flex flex-row justify-center ${showSignup
                                    ? "opacity-0 translate-x-10 pointer-events-none"
                                    : "opacity-100 translate-x-0"
                                    }`} >

                                    <button className="border min-w-[30px] rounded-full hover:bg-black hover:text-white transition-all duration-500" style={{ padding: "8px 20px" }} onClick={() => setShowSignup(true)}>Start Writing</button>
                                    <Link to="/login">
                                        <button className="border min-w-[30px] rounded-full hover:bg-black hover:text-white transition-all duration-500" style={{ padding: "8px 20px" }}>Demo</button>
                                    </Link>
                                </div>
                                <div className={`flex flex-row justify-center ${showSignup
                                    ? "opacity-100"
                                    : "opacity-0 "
                                    }`} > Already folding your thoughts elsewhere ? </div>
                            </div></>}

                    </div>

                    <div className="flex flex-col items-center w-full" >
                        <hr className="bg-white w-[80%] flex items-center" />
                    </div>
                </div>
                <div className="uppercase" style={{ margin: "15px" }}>Today's reading</div>



            </div>
            <SignupPanel
                isOpen={showSignup}
                onClose={() => setShowSignup(false)}
                showLogin={showLogin}
                onLoginClick={() => setShowLogin(true)}
                setIsAuthenticated={setIsAuthenticated}

            />
            <LoginPanel isOpen={showLogin} onClose={() => setShowLogin(false)} onSignupClick={() => setShowSignup(true)}
                    setIsAuthenticated={setIsAuthenticated}
/>

            <ToastContainer />
        </>
    )
}

export default Home