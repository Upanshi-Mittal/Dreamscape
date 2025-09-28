import React from 'react'
import { Link } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import './home.css'

function Home() {
    return (
        <div className="container" >
            <div className="left" ></div>
            <div className="overlay" >
                <div className="inner-box">
                    <h1>DREAMSCAPE</h1>
                    <h2 style={{color:"white",fontSize:"25px"}}>"Explore the frontiers of AI, machine learning, web technologies, and groundbreaking innovations. Join Dreamscape to stay inspired and informed.</h2>

                    <Link to="/signup">
                        <button className="signup">
                            SignUp
                        </button>
                    </Link>

                    <Link to="/login">
                        <button className="login" style={{ fontSize: "20px" }}>
                            Login
                        </button>
                    </Link>
                </div>
                </div>
                <div className="right" ></div>
            
            <ToastContainer />
        </div>
    )
}

export default Home