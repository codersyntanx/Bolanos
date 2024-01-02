import './StartPage.css'
import "./Start.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Skeleton } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Select from 'react-select';
import { Modal,Input,notification } from 'antd';
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '9px',
    height: '51px',
    border: state.isFocused ? '1px solid rgba(0, 0, 0, 0.42)' : '1px solid rgba(0, 0, 0, 0.42)',
    boxShadow: state.isFocused ? '1px solid rgba(0, 0, 0, 0.42)' : 'none',
  }),
  menu: (provided) => ({
    ...provided,
    overflowY: 'scroll',
    maxHeight: '150px',
  }),
};


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
    const[informId, setInformId]=useState(null)
    const[response, setResponse]=useState("")
    useEffect(() => {
      const informationId = localStorage.getItem("mainid");
      if (informationId && informId !== informationId) {
        setInformId(informationId);
      }
    }, [informId]);
  
    useEffect(() => {
      if (informId !== null) {
        fetchInformationById();
      }
    }, [informId]);
  
    const fetchInformationById = async () => {
      try {
        const res = await axios.get(`https://serverforbce.vercel.app/api/getinformationbyid/${informId}`);
        const data = res.data.data;
  
        // Update state variables with fetched data
        setResponse(data);
        setSelectedOption(data.selectedOption);
        setBussinesstype(data.bussinesstype);
        setFullname(data.fullname);
        setMiddlename(data.middlename);
        setLastname(data.lastname);
        setSuffix(data.suffix);
        setAddress(data.address);
        setZip(data.zip);
        setCity(data.city);
        setDateofBirth(data.dateofBirth);
  
        // Extract and set phone number parts
        if (data.phonenumber) {
          const phoneNumberParts = data.phonenumber.split('-');
          setAreaCode(phoneNumberParts[0]);
          setMiddlePart(phoneNumberParts[1]);
          setLastPart(phoneNumberParts[2]);
        }
  
        setAppartment(data.appartment);
        setUsdotnum(data.usdotnum);
      } catch (error) {
        console.error('Error fetching information by ID:', error);
      }
    };
  




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
        componentRestrictions: { country: 'us' }, 
    };



    const handleSelect = async (value) => {
      try {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
    
        // Access city, state, and zip code from the first result
        const addressComponents = results[0].address_components;
        console.log('Address Components:', addressComponents);
    
        // Try finding city, state, and zip code with alternative types
        const cityComponent = addressComponents.find(
          (component) => component.types.includes('locality')
        );
    
        const stateComponent = addressComponents.find(
          (component) => component.types.includes('administrative_area_level_1')
        );
    
        const countryComponent = addressComponents.find(
          (component) => component.types.includes('country')
        );
    
        const zipCodeComponent = addressComponents.find(
          (component) =>
            component.types.includes('postal_code') ||
            component.types.includes('postal_code_suffix') ||
            component.types.includes('postal_code_prefix')
        );
    
        const streetAddress = results[0].formatted_address;
        console.log(streetAddress);
    
        const city = cityComponent ? cityComponent.long_name : '';
        const state = stateComponent ? stateComponent.long_name : '';
        const country = countryComponent ? countryComponent.long_name : '';
        const zipCode = zipCodeComponent ? zipCodeComponent.long_name : '';
    
        // Remove city, country, and state from the street address using regex
        const cleanedStreetAddress = streetAddress.replace(
          new RegExp(`${city},|${country},|${state},`, 'g'),
          ''
        ).trim();
    
        setAddress(cleanedStreetAddress);
        setCity(`${city}, ${state},${country}`);
        setZip(zipCode);
    
        console.log('Street Address:', streetAddress);
        console.log('City:', city);
        console.log('State:', state);
        console.log('Country:', country);
        console.log('Zip Code:', zipCode);
      } catch (error) {
        console.error('Error selecting address:', error);
        // Handle the error (e.g., show a user-friendly message)
      }
    };
    
    
    
      
      
      
      
      let middlePartInput, lastPartInput;

      const handleInputChange = (e, nextInputRef) => {
        const inputValue = e.target.value;
        const maxLength = parseInt(e.target.maxLength, 11);
    
        if (inputValue.length <= maxLength) {
          if (nextInputRef && inputValue.length === maxLength) {
            nextInputRef.focus();
          }
    
          switch (e.target.name) {
            case 'areaCode':
              setAreaCode(inputValue);
              break;
            case 'middlePart':
              setMiddlePart(inputValue);
              break;
            case 'lastPart':
              setLastPart(inputValue);
              break;
            default:
              break;
          }
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
 
    const handleButtonClick = () => {
      if (areaCode.length !== 3 || middlePart.length !== 3 || lastPart.length !== 4) {
          openNotification("error", "Incorrect Phone number");
          return; // Stop further execution if the phone number is incorrect
      }
  
      setLoading(true);
  
      const requiredFields = [
          { name: 'selectedOption', label: 'USDOT#' },
          { name: 'bussinesstype', label: 'Business Type' },
          { name: 'fullname', label: 'First Name' },
          { name: 'lastname', label: 'Last Name' },
          { name: 'suffix', label: 'Suffix' },
          { name: 'address', label: 'Address' },
          { name: 'zip', label: 'Zip Code' },
          { name: 'city', label: 'City' },
          { name: 'dateofBirth', label: 'Date of Birth' }
      ];
  
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
          phonenumber: `${areaCode}-${middlePart}-${lastPart}`,
          appartment,
          usdotnum
      };
  
      const missingFields = requiredFields.filter(field => !userData[field.name]);
  
      if (missingFields.length === 0) {
          if (informId != null) {
              axios.put(`https://serverforbce.vercel.app/api/putinformation/${informId}`, userData)
                  .then((res) => {
                      if (res.status === 200 && res.data.status === true) {
                          changeIcon("fa-regular fa-circle-check green-icon");
                          handleNavigationClick("vehicles");
                      } else {
                          console.error("Unexpected server response:", res);
                          alert("Error while processing the request. Please try again.");
                      }
                  })
                  .catch((error) => {
                      console.error("Error during request:", error);
                      alert("Error during request. Please try again.");
                  })
                  .finally(() => {
                      setLoading(false);
                  });
          } else {
              axios.post("https://serverforbce.vercel.app/api/postinformation", userData)
                  .then((res) => {
                      if (res.status === 200 && res.data.status === true) {
                          localStorage.setItem("mainid", res.data.created._id);
                          changeIcon("fa-regular fa-circle-check green-icon");
                          handleNavigationClick("vehicles");
                      } else {
                          console.error("Unexpected server response:", res);
                          alert("Error while processing the request. Please try again.");
                      }
                  })
                  .catch((error) => {
                      console.error("Error during request:", error);
                      alert("Error during request. Please try again.");
                  })
                  .finally(() => {
                      setLoading(false);
                  });
          }
      } else {
          // Display error alert with missing field names
          const missingFieldNames = missingFields.map(field => field.label).join(', ');
          openNotification("error", `Please fill in the following required fields: ${missingFieldNames}`);
          setLoading(false); // Ensure loading is set to false in case of an error
      }
  };
  
  
  

    

    
    const options = [
      { value: 'Contractor', label: 'Contractor' },
      { value: 'Dirt.Sand and Gravel', label: 'Dirt.Sand and Gravel' },
      { value: 'Landscaper', label: 'Landscaper' },
      { value: 'Towing', label: 'Towing' },
      { value: 'Trucker', label: 'Trucker' },
      { value: 'Trucker', label: 'Trucker' },
      { value: 'Trucker', label: 'Trucker' },
    ];
      const handleSelected = (selectedOption) => {
        setBussinesstype(selectedOption.value);
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
                                className='custom-radio-btn'
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
                                className='custom-radio-btn'
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
                                className='custom-radio-btn'
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
                    <div className='col-md-4'>
                    <Select
      options={options}
      onChange={handleSelected}
      value={options.find((option) => option.value === bussinesstype)}
      styles={customStyles}
    />
            </div>
                </div>

                <p className="business-owner-info">Home address/personal information of the business owner</p>

                <div className='owner-info-form'>
                    <div className="name-part">
                        <p className="name-txt">Business owner name</p>
                        <div className="name-fields">
                            <div className="inner-part">
                                <input class="form-control form-control-lg full-name" type="text" placeholder="First Name" aria-label=".form-control-lg example" value={fullname} onChange={(e) => { setFullname(e.target.value) }} />
                                <input class="form-control form-control-lg mi" type="text" placeholder="MI" aria-label=".form-control-lg example" value={middlename} onChange={(e) => { setMiddlename(e.target.value) }} />
                            </div>
                            <div className="inner-part">
                                <input class="form-control form-control-lg last-name" type="text" placeholder="Last Name" aria-label=".form-control-lg example" value={lastname} onChange={(e) => { setLastname(e.target.value) }} />
                                <input class="form-control form-control-lg sufix" type="text" placeholder="Suffix" aria-label=".form-control-lg example" value={suffix} onChange={(e) => { setSuffix(e.target.value) }} />
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
                            <input value={appartment} onChange={(e) => { setAppartment(e.target.value) }} class="form-control form-control-lg full-field" />
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
                        <input
  className="form-control form-control-lg full-field"
  type="date"
  aria-label=".form-control-lg example"
  value={dateofBirth}
  onChange={(e) => { setDateofBirth(e.target.value) }}
  style={{ color: 'transparent' }}
/>

                        </div>
                    </div>
                    <div className="name-part">
      <p className="name-txt">Phone Number</p>
      <div className="name-fields">
        <div className="row numberrow">
          <div className="col-md-2">
            <input
              className="form-control form-control-lg full-field"
              type="text"
              maxLength="3"
              onChange={(e) => handleInputChange(e, middlePartInput)}
              value={areaCode}
              name="areaCode"
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control form-control-lg full-field"
              type="text"
              maxLength="3"
              onChange={(e) => handleInputChange(e, lastPartInput)}
              value={middlePart}
              name="middlePart"
              ref={(input) => {
                middlePartInput = input;
              }}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control form-control-lg full-field"
              type="text"
              maxLength="4"
              onChange={(e) => handleInputChange(e)}
              value={lastPart}
              name="lastPart"
              ref={(input) => {
                lastPartInput = input;
              }}
            />
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