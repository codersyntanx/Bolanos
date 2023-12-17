import './StartPage.css'
import "./Start.css"
import { useState } from 'react';
function StartPage({ changeIcon, handleNavigationClick }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [bussinesstype, setBussinesstype] = useState(null);
    const [fullname, setFullname] = useState("")
    const [middlename,setMiddlename]= useState("")
    const [lastname,setLastname]= useState("")
    const [suffix,setSuffix]= useState("")
    const [address,setAddress]= useState("")
    const [zip,setZip]= useState("")
    const [city,setCity]= useState("")
    const [dateofBirth,setDateofBirth]= useState("")
    const [phonenumber,setPhonenumber]= useState("")


    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const handleButtonClick = () => {
        // Check if all required fields are filled
        if (
            selectedOption &&
            bussinesstype &&
            fullname &&
            middlename &&
                lastname &&
                suffix &&
            address &&
            zip &&
            city &&
            dateofBirth
        ) {
            // Save data to local storage
            const userData = {
                selectedOption,
                bussinesstype,
                fullname,
                middlename,
                lastname,
                suffix,
                address,
                zip,
                city,
                dateofBirth,
                phonenumber
            };
            localStorage.setItem('userData', JSON.stringify(userData));
    
            // Change icon and navigate to the next page
            changeIcon("fa-regular fa-circle-check green-icon");
            handleNavigationClick("vehicles");
        } else {
            // Display error alert if fields are not complete
            alert("Please fill in all required fields.");
        }
    };
    
    const handlebusinessstype = (type) => {
        setBussinesstype(type)
    }

    return (
        <>
            <div className="small-screen-header">
                <div className="Start_Nav d-flex">
                    <div className="Page_Position gap-2 d-flex  align-items-center">

                        <span className="circle_position"><span className="first_name">1</span><span className="outof">/5</span></span>
                        <span className="Page_Name">Start</span>

                    </div>
                    <div className="next-page">
                        <span className="next-step">Next step</span>
                        <span className="vehicles" onClick={() => { handleNavigationClick("vehicles") }}>Vehicles</span>

                    </div>
                </div>
            </div>
            <section className='start-hero-section'>
                <p className="usdotheading">Does the customer have a USDOT Number?</p>
                <p className="usdotcontent">The number is registered to the customer’s busniess and displayed on the side of the vehicle.Any bussiness type could have a USDOT registration.Need to confirm the customer’s USDOT number? search by busniessname is  <span className='Bolanos'>Bolanos</span></p>
                <div className='radiobtn-part'>
                    <form className='radiobtns'>
                        <div className='radiob'>
                            <input
                                type="radio"
                                id="example1"
                                name="radiobtn"
                                className='radiobtn'
                                value="Yes"
                                checked={selectedOption === "Yes"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="example1" className='radiobtn-label'>Yes - the customer has a USDOT number</label>
                        </div>
                        <div className='radiob'>
                            <input
                                type="radio"
                                id="example2"
                                name="radiobtn"
                                className='radiobtn'
                                value="No"
                                checked={selectedOption === "No"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="example2" className='radiobtn-label'>No - and the customer will not have a USDOT number</label>
                        </div>
                        <div className='radiob'>
                            <input
                                type="radio"
                                id="example3"
                                name="radiobtn"
                                className='radiobtn'
                                value="Not Yet"
                                checked={selectedOption === "Not Yet"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="example3" className='radiobtn-label'>Not Yet - but the customer has applied/will apply for a USDOT number within 60 days.</label>
                        </div>
                    </form>
                </div>
            </section>
            <section className='business-type-section'>
                <p className="business-type-heading">Most Common Business Types:</p>
                <div className='business-type'>
                    <span className='busnes-types' onClick={() => { handlebusinessstype("Contractor") }}>Contractor</span>
                    <span className='busnes-types' onClick={() => { handlebusinessstype("Dirt.Sand and Gravel") }}>Dirt.Sand and Gravel</span>
                    <span className='busnes-types' onClick={() => { handlebusinessstype("Landscaper") }}>Landscaper</span>
                    <span className='busnes-typess' onClick={() => { handlebusinessstype("Towing") }}>Towing</span>
                    <span className='busnes-typess' onClick={() => { handlebusinessstype("Trucker") }}>Trucker</span>
                </div>
                <div className='business-type'>

                </div>
                <input className='business-type-btn busines-type-link' placeholder='Other type of business' value={bussinesstype} onChange={(e) => { handlebusinessstype(e.target.value) }} ></input>
                <p className="business-owner-info">Home address/personal information of the business owner</p>

                <div className='owner-info-form'>
                    <div className="name-part">
                        <p className="name-txt">Business owner name</p>
                        <div className="name-fields">
                            <div className="inner-part">
                                <input class="form-control form-control-lg full-name" type="text" placeholder="Full Name" aria-label=".form-control-lg example" onChange={(e)=>{setFullname(e.target.value)}}/>
                                <input class="form-control form-control-lg mi" type="text" placeholder="MI" aria-label=".form-control-lg example"  onChange={(e)=>{setMiddlename(e.target.value)}} />
                            </div>
                            <div className="inner-part">
                                <input class="form-control form-control-lg last-name" type="text" placeholder="Last Name" aria-label=".form-control-lg example"  onChange={(e)=>{setLastname(e.target.value)}}/>
                                <input class="form-control form-control-lg sufix" type="text" placeholder="Suffix" aria-label=".form-control-lg example"  onChange={(e)=>{setSuffix(e.target.value)}}/>
                            </div>
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Street Address</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" placeholder="Home address" aria-label=".form-control-lg example" onChange={(e)=>{setAddress(e.target.value)}} />
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Zip Code:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example"  onChange={(e)=>{setZip(e.target.value)}} />
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">City:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example"  onChange={(e)=>{setCity(e.target.value)}} />
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Date of Birth:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="date" aria-label=".form-control-lg example" onChange={(e)=>{setDateofBirth(e.target.value)}} />
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Phone Number
                            (Optional)</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" onChange={(e)=>{setPhonenumber(e.target.value)}}/>
                        </div>
                    </div>
                    <div className="disclouser-part">
                        <p className="disclouser-text">For a phone quote,you must read the disclosure to the customer.if in person,please print and provide to the customer.</p>
                        <button className="disclouser-btn">Print Disclosure</button>
                    </div>
                    <p className="last-para"><strong>Information Disclosure:</strong>Like most insurance companies, Progressive uses information from you and other sources,such as your driving claim and crdit histories,to calculate an accurate price for your insurance.New or updated information may be used to calculate your renewal premium.Its<span className='privacy-policy'> Privacy Policy</span>,explain how progressive discloses and protect information and how you may access and correct it.I can provide a copy at your request,</p>

                </div>
                <div className="btns_position">
                    <button className="back_button" onClick={() => handleNavigationClick("vehicles")}>
                        {' '}
                        Back &nbsp;&nbsp;
                    </button>
                    <button className="small-screen" onClick={() => handleNavigationClick("vehicles")}>
                        {' '}
                        <i class="fa-solid fa-angle-left"></i>
                    </button>
                    <button className="continous_button" onClick={handleButtonClick}>
                        Contious &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </section>

        </>
    )
}
export default StartPage