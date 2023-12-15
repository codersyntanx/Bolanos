import "./Signup.css"
import logo from "./images/LOGO BOLANOS 2024 PDF.svg"
import busy from "./images/WhatsApp Image 2023-11-24 at 02.55.39_96707ce0.jpg"
import { Link } from "react-router-dom"

function Signup() {
    return (
        <div className="signuppage">
            <div className="row " >
                <div className="col-md-6 leftsider ">
                    <div className="centeralign centerdiv">
                        <Link to="/">
                            <img className="mx-auto signuplogo" style={{width:"128px", height:"63px"}} src={logo} alt="bce-logo" /></Link>
                        <div className="mt-4 signupheadings">
                            <p className="account" ><b>Sign up account</b></p>
                            <span className="access">Fill out follwing details</span>
                        </div>
                        <div className="form mt-4 maincard " >
                            <input className="form-control mb-3 signupinputs" type="text" placeholder="Your Name" aria-label="Your Name" />
                            <input className="form-control mb-3 signupinputs" type="text" placeholder="E-mail" aria-label="E-mail" />
                            <input className="form-control mb-3 signupinputs" type="password" placeholder="Password" aria-label="default input example" />
                            <input className="form-control mb-3 signupinputs" type="password" placeholder="Confirm-Password" aria-label="default input example" />
                            <button className="btn btn-dark sugnupbtn" style={{ width: "100%" }}>Register</button>
                            <p className="text-center mt-3">Already a user? <b>Login</b></p>

                        </div>
                        <br></br><br></br>
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
                    <img width="100%" src={busy} alt="loginimage" />
                </div>
            </div>

        </div>
    )
}
export default Signup