import './StartPage.css'
import "./Start.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const apiKey = 'AIzaSyCiHcISCPplB5kl6lAG4zzkRg6uTHvMc8A';
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
    const [areaCode, setAreaCode] = useState('');
    const [middlePart, setMiddlePart] = useState('');
    const [lastPart, setLastPart] = useState('');
    const [loading, setLoading] = useState(false);
   
    const onSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        // Assuming onSelect is a function to handle the selected location
        handleSelect({ address: value, latLng });
        setAddress(value);
      };
      const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        onSelect({ address: value, latLng });
        setAddress(value);
      };
    
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };
    useEffect(() => {
        const formattedPhoneNumber = `${areaCode}-${middlePart}-${lastPart}`;
        setPhonenumber(formattedPhoneNumber);
    }, [areaCode, middlePart, lastPart]);
    const handleButtonClick = () => {
        // Check if all required fields are filled
        setLoading(true);
    console.log(phonenumber)
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
    
            axios.post("https://serverforbce.vercel.app/api/postinformation", userData)
                .then(res => {
                    if (res.status === 200 && res.data.status === true) {
                        localStorage.setItem("mainid", res.data.created._id);
                        changeIcon("fa-regular fa-circle-check green-icon");
                        handleNavigationClick("vehicles");
                    } else {
                        console.error("Unexpected server response:", res);
                        alert("Error while processing the request. Please try again.");
                    }
                })
                .catch(error => {
                    console.error("Error during request:", error);
                    alert("Error during request. Please try again.");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            // Display error alert if fields are not complete
            alert("Please fill in all required fields.");
            setLoading(false); // Ensure loading is set to false in case of an error
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
                <p className="usdotheading">Do you have a USDOT#? </p>
                <p className="usdotcontent">The number is registered to the your business and displayed on the side of the vehicle. Any business  type could have a USDOT registration.</p>
                <div className='radiobtn-part'>
                    <form className='radiobtns'>
                        <div className='radiob' style={{width:"34%"}}>
                            <input
                                type="radio"
                                id="example1"
                                name="radiobtn"
                                className='radiobtn'
                                value="Yes"
                                checked={selectedOption === "Yes"}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor="example1" className='radiobtn-label'>Yes</label>
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
                            <label htmlFor="example2" className='radiobtn-label'>No</label>
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
                <div className='business-type row'>
                <input className='col-md-6 business-type-btn busines-type-link' placeholder='Other type of business' value={bussinesstype} onChange={(e) => { handlebusinessstype(e.target.value) }} ></input>
                    <div className='col-md-6 busnes-types-outer'>
                    <span className='busnes-types' onClick={() => { handlebusinessstype("Contractor") }}>Contractor</span>
                    <span className='busnes-types' onClick={() => { handlebusinessstype("Dirt.Sand and Gravel") }}>Dirt.Sand and Gravel</span>
                    <span className='busnes-types' onClick={() => { handlebusinessstype("Landscaper") }}>Landscaper</span>
                    <span className='busnes-typess' onClick={() => { handlebusinessstype("Towing") }}>Towing</span>
                    <span className='busnes-typess' onClick={() => { handlebusinessstype("Trucker") }}>Trucker</span>
                    </div>
                   
                </div>
              
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
        <div className="address-autocomplete">
      <PlacesAutocomplete
        value={address}
        onChange={(value) => setAddress(value)}
        onSelect={onSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Home address',
                className: 'form-control form-control-lg full-field',
              })}
            />
            <div className="suggestions-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => (
                <div className='suggestion' key={suggestion.placeId} {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
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
                        <p className="name-txt">Phone Number</p>
                        <div className="name-fields">
                            <div className='row numberrow'>
                                <div className='col-md-2'>
                                <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" onChange={(e)=>{setAreaCode(e.target.value)}}/>
                                </div> ─
                                <div className='col-md-2'>
                                <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" onChange={(e)=>{setMiddlePart(e.target.value)}}/>
                                </div>─
                                <div className='col-md-2'>
                                <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" onChange={(e)=>{setLastPart(e.target.value)}}/>
                                </div>
                            </div>

                        </div>
                    </div>
                    
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
                    <Spin spinning={loading}> 

                    Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i></Spin>
                    </button>
                </div>
            </section>

        </>
    )
}
export default StartPage