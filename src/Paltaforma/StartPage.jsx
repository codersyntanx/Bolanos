import './StartPage.css'
import "./Start.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Skeleton } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Select from 'react-select';
import { Modal,Input,notification } from 'antd';
function StartPage({ changeIcon, handleNavigationClick }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [bussinesstype, setBussinesstype] = useState(null);
    const [fullname, setFullname] = useState("")
    const [middlename, setMiddlename] = useState("")
    const [lastname, setLastname] = useState("")
    const [suffix, setSuffix] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [dateofBirth, setDateofBirth] = useState("")
    const [phonenumber, setPhonenumber] = useState("")
    const [areaCode, setAreaCode] = useState('');
    const [middlePart, setMiddlePart] = useState('');
    const [lastPart, setLastPart] = useState('');
    const [loading, setLoading] = useState(false);
    const [appartment, setAppartment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const[usdotnum,setUsdotnum]=useState("")
    const handleModalCancel = () => {
             setModalVisible(false);
             setSelectedOption("")
             setUsdotnum("")
      };
      const handleModalOk = async (e) => {
        if(usdotnum != ""){
            setModalVisible(false);
            openNotification('success', 'USDOT is added Successfully');
       }else{
           openNotification('error', 'USDOT Input must be Filled');

       }
      };


      const openNotification = (type, message, description = '') => {
        notification[type]({
          message,
          description,
        });
      };
    const searchOptions = {
        componentRestrictions: { country: 'us' }, // Restrict suggestions to the United States
    };



    const handleSelect = async (value) => {
        try {
          const results = await geocodeByAddress(value);
          const latLng = await getLatLng(results[0]);
      
          // Access city and zip code from the first result
          const addressComponents = results[0].address_components;
          console.log('Address Components:', addressComponents);
      
          // Try finding city and zip code with alternative types
          const cityComponent = addressComponents.find(
            (component) => component.types.includes('locality')
          );
      
          const zipCodeComponent = addressComponents.find(
            (component) =>
              component.types.includes('postal_code') ||
              component.types.includes('postal_code_suffix') ||
              component.types.includes('postal_code_prefix')
          );
      
          const city = cityComponent ? cityComponent.long_name : '';
          const zipCode = zipCodeComponent ? zipCodeComponent.long_name : '';
      
          setAddress(value);
          setCity(city);
          setZip(zipCode); 
      
          console.log('City:', city);
          console.log('Zip Code:', zipCode);
        } catch (error) {
          console.error('Error selecting address:', error);
          // Handle the error (e.g., show a user-friendly message)
        }
      };
      
      
      
      
      
  
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'Yes') {
            setModalVisible(true);
          } else {
            setModalVisible(false);
          }
    };
    useEffect(() => {
        const formattedPhoneNumber = `${areaCode}-${middlePart}-${lastPart}`;
        setPhonenumber(formattedPhoneNumber);
    }, [areaCode, middlePart, lastPart]);
    const handleButtonClick = () => {
        // Check if all required fields are filled
        setLoading(true);
        if (
            selectedOption &&
            bussinesstype &&
            fullname &&
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
                phonenumber,
                appartment,
                usdotnum
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

    const options = [
        'Contractor',
        'Dirt.Sand and Gravel',
        'Landscaper',
        'Towing',
        'Trucker',
      ];
    
      const [suggestions, setSuggestions] = useState([]);
    
      const handleChange = (e) => {
        const value = e.target.value;
        setBussinesstype(value);
    
        // Filter options based on the input value
        const filteredSuggestions = options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      };
    
      const handleSelected = (selectedOption) => {
        setBussinesstype(selectedOption);
        setSuggestions([]);
      };
    

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
                        <div className='radiob' style={{ width: "34%" }}>
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
                    <div className='col-md-2'></div>
                    <div className='col-md-10'>
                            <input
        type="text"
        className='full-field px-2'
        value={bussinesstype}
        onChange={handleChange}
        placeholder="Type to search..."
      />
      <ul className='mainlicom'>
        {suggestions.map((option, index) => (
          <li key={index} onClick={() => handleSelected(option)}>
            {option}
          </li>
        ))}
      </ul>
                    </div>
            
                </div>

                <p className="business-owner-info">Home address/personal information of the business owner</p>

                <div className='owner-info-form'>
                    <div className="name-part">
                        <p className="name-txt">Business owner name</p>
                        <div className="name-fields">
                            <div className="inner-part">
                                <input class="form-control form-control-lg full-name" type="text" placeholder="Full Name" aria-label=".form-control-lg example" onChange={(e) => { setFullname(e.target.value) }} />
                                <input class="form-control form-control-lg mi" type="text" placeholder="MI" aria-label=".form-control-lg example" onChange={(e) => { setMiddlename(e.target.value) }} />
                            </div>
                            <div className="inner-part">
                                <input class="form-control form-control-lg last-name" type="text" placeholder="Last Name" aria-label=".form-control-lg example" onChange={(e) => { setLastname(e.target.value) }} />
                                <input class="form-control form-control-lg sufix" type="text" placeholder="Suffix" aria-label=".form-control-lg example" onChange={(e) => { setSuffix(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Street Address</p>
                        <div className="address-autocomplete">
                            <PlacesAutocomplete
                                value={address}
                                onChange={(value) => setAddress(value)}
                                onSelect={handleSelect}
                                searchOptions={searchOptions}
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
                                            {loading && <div> <Skeleton active /></div>}
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


                    <div className='name-part'>
                        <p className="name-txt">Apt/Suite/Other:(Optional)</p>
                        <div className="name-fields">
                            <input onChange={(e) => { setAppartment(e.target.value) }} class="form-control form-control-lg full-field" />
                        </div>
                    </div>



                    <div className="name-part">
                        <p className="name-txt">Zip Code:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" value={zip} aria-label=".form-control-lg example" readOnly />
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">City:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" value={city} readOnly/>
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Date of Birth:</p>
                        <div className="name-fields">
                            <input class="form-control form-control-lg full-field" type="date" aria-label=".form-control-lg example" onChange={(e) => { setDateofBirth(e.target.value) }} />
                        </div>
                    </div>
                    <div className="name-part">
                        <p className="name-txt">Phone Number</p>
                        <div className="name-fields">
                            <div className='row numberrow'>
                                <div className='col-md-2'>
                                    <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" onChange={(e) => { setAreaCode(e.target.value) }} />
                                </div> —
                                <div className='col-md-2'>
                                    <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" onChange={(e) => { setMiddlePart(e.target.value) }} />
                                </div> —
                                <div className='col-md-2'>
                                    <input class="form-control form-control-lg full-field" type="text" aria-label=".form-control-lg example" onChange={(e) => { setLastPart(e.target.value) }} />
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
            <Modal
        title="USDOT number"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
          
        {/* Ant Design Input for USDOT number */}
        <Input
          value={usdotnum}
          onChange={(e) => setUsdotnum(e.target.value)}
          placeholder="Enter USDOT number"
        />
      </Modal>
        </>
    )
}
export default StartPage