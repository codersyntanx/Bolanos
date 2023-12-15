import "./Login.css"
import logo from "./images/LOGO BOLANOS 2024 PDF.svg"
import facebook from "./images/icons8-facebook-48.png";
import twitter from "./images/icons8-twitter-circled-48.png";
import google from "./images/icons8-google-48.png";
import rightsider from "./images/WhatsApp Image 2023-11-24 at 02.54.25_a627490f.jpg"
import { Link } from "react-router-dom";
function Login() {
    return (
        <>
            <div className="mainlogin">
                <div className="row ">
                    <div className="col-md-6 loginscreen">
                        <div className="centeralign ">
                            <Link to="/"><img src={logo} className="loginlogo" style={{width:"128px", height:"63px"}} alt="bce-logo" /></Link>

                            <div className="mt-4 signupheadings">
                                <p className="account" ><b>Login</b></p>
                                <span className="access" >Access back to your account</span>

                            </div>
                            <div className="form mt-4 maincard " >
                                <div className="inputss">
                                    <input className="form-control mb-3 signupinputs" type="text" placeholder="E-mail/ Username" aria-label="Your Name" />
                                    <input className="form-control mb-3 signupinputs" type="password" placeholder="Password" aria-label="E-mail" />
                                </div>

                                <b className="float-end forget">Forgot password?</b>
                                <button className="btn btn-dark loginbtn mt-3">Login</button>
                                <p className="text-center newuser mt-3">New user? <b>Register Account</b></p>
                                <div className="d-flex mt-5">
                                    <hr className="d-flex loginlin"></hr> &nbsp;&nbsp;&nbsp;<span className="loginwith">or Login with</span>  &nbsp;&nbsp;&nbsp; <hr className="d-flex loginlin"></hr>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <img src={twitter} alt="twitter" />
                                    <img src={facebook} alt="facebook" />
                                    <img src={google} alt="google" />
                                </div>
                            </div>

                            <br></br><br></br><br></br>
                        </div>

                    </div>
                    <div className="col-md-6 rightside " style={{ background: "#001224" }}>
                        {/* <div className="imagecover" style={{position:"relative",top:"8%"}}>
                    <div className="white-truck"><i className="fa-solid fa-truck"></i>
                    <p className="display-6">Safety in your truck</p>
                    </div>
                    <img src={busy} alt="signimg" style={{width:"55%", borderRadius:"10px"}}/>
                    <div className="white-protect"><i className="fa-solid fa-shield"></i>
                    <p className="display-6">24 Hours Protection</p>
                    </div>
                </div><br/><br></br>
                <h1 className="typo text-light mt-5 display-3">
               <span> “</span><br></br>
                The easiest way<br></br> to buy and  manage<br></br> trucking insurance </h1> */}
                        <img width="100%" src={rightsider} alt="image" />
                    </div>
                </div>
            </div>


        </>
    )
}
export default Login