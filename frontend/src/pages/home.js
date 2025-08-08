import React from 'react'
import {Link} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import './home.css'
function Home() {
    return (
        <div className="container">
            <div className="overlay" style={{width:"35%",height:"60%"}}>
            <h2 style={{fontSize:"50px"}}>Home</h2>
            
                <Link to="/signup">
                    <button className="signup">
                        SignUp
                    </button>
                </Link>
            
                <Link to="/login">
                    <button className="login" style={{ fontSize:"20px" }}>
                        Login
                    </button>
                </Link>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Home