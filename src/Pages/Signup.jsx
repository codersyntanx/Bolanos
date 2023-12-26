import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./images/LOGO BOLANOS 2024 PDF.svg";
import busy from "./images/WhatsApp Image 2023-11-24 at 02.55.39_96707ce0.jpg";
import "./Signup.css";

function Signup() {
    return (
        <div className="signuppage">
            <div className="row">
                <div className="col-md-6 leftsider">
                    <div className="centeralign centerdiv">
                        <Link to="/">
                            <img className="mx-auto signuplogo" src={logo} alt="bce-logo" />
                        </Link>
                        <div className="mt-4 signupheadings">
                            <p className="account"><b>Sign up account</b></p>
                            <span className="access">Fill out the following details</span>
                        </div>
                        <div className="form mt-4 maincard">
                            <input className="form-control mb-3 signupinputs" type="text" id="name" placeholder="Your Name" aria-label="Your Name" />
                            <input className="form-control mb-3 signupinputs" type="text" id="email" placeholder="E-mail" aria-label="E-mail" />
                            <input className="form-control mb-3 signupinputs" type="password" id="password" placeholder="Password" aria-label="Password" />
                            <input className="form-control mb-3 signupinputs" type="password" id="confirmPassword" placeholder="Confirm-Password" aria-label="Confirm Password" />
                            <button className="btn btn-dark sugnupbtn" style={{ width: "100%" }}>Register</button>
                            <p className="text-center mt-3">Already a user? <Link to="/login"><b>Login</b></Link></p>
                        </div>
                        <br /><br />
                    </div>
                </div>
                <div className="col-md-6 rightside" style={{ background: "#001224" }}>
                    <img width="100%" src={busy} alt="loginimage" />
                </div>
            </div>
        </div>
    );
}

export default Signup;
