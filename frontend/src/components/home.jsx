import React from 'react'
import { Link } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import './home.css'
import Threads from '../styleComponents/Thread/Thread';
import Header from './header';
function Home() {
    return (
        <div className="home-container ">
            <Header />
            <div className="overlay">

                <div className="inner-box ">
                    <div> Some thoughts deserve more than a notes app.</div>

                    <h2>
                        "Every paper plane begins as a blank page."
                    </h2>
                    <h4>Fold your thoughts. let them travel.
                    </h4>
                    <div className="flex flex-row justify-center ">
                        <Link to="/signup">
                            <button className="signup">Start Writing</button>
                        </Link>

                        <Link to="/login">
                            <button className="login">Demo</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className= " flex flex-col justify-center w-full" >
                <hr className="bg-white w-[80%] flex items-center" />
                <div className="uppercase">Today's reading</div>
            </div>
            

            <ToastContainer />
        </div>
    )
}

export default Home