
import { useEffect, useState } from "react";
import "./business.css"
import axios from "axios";
import {notification } from 'antd';

function AboutBusinessPage({ changeIcon,handleNavigationClick }){

  const [customerEmail, setCustomerEmail] = useState('');
  const [currentlyInsured, setCurrentlyInsured] = useState(null);
  const [continuousCoverage, setContinuousCoverage] = useState(null);
  const [bodilyInjuryLimit, setBodilyInjuryLimit] = useState('');
  const [policyExpirationDate, setPolicyExpirationDate] = useState('');
  const [hasMCNumber, setHasMCNumber] = useState(null);
  const [informId, setInformId] = useState("")
  useEffect(() => {
    const informationId = localStorage.getItem("mainid");
    if (informationId) {
      setInformId(informationId);
    }
  }, []);
 const handleButtonClick = () => {
    if (
      customerEmail &&
      currentlyInsured !== null &&
      // continuousCoverage &&
      // bodilyInjuryLimit &&
      // policyExpirationDate &&
      hasMCNumber !== null
    ) {
      const businessData = {
        informId,
        customerEmail,
        currentlyInsured,
        continuousCoverage,
        bodilyInjuryLimit,
        policyExpirationDate,
        hasMCNumber,
      };
axios.post("https://serverforbce.vercel.app/api/postbusiness",businessData)
.then(res=>{
  if(res.data.status === true){
    openNotification('success', 'data addedd successfully');

     changeIcon('fa-regular fa-circle-check green-icon');
      handleNavigationClick('coverages');
  }
})
     
    } else {
      // Display error alert if fields are not complete
      openNotification('error', 'Error Occured');
    }
  };

  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
    });
  };


    return(
        <>
         <div className="small-screen-header">
           <div className="Start_Nav d-flex">
        <div className="Page_Position gap-2 d-flex  align-items-center">
           
            <span className="circle_position"><span className="first_name">4</span><span className="outof">/5</span></span>
            <span className="Page_Name">About Business</span>
           
        </div>
        <div className="next-page">
            <span className="next-step">Next step</span>
            <span className="vehicles"onClick={()=>{handleNavigationClick("coverages")}}>Coverages</span>

        </div>
       </div>
       </div>
       <div className="businesspage">
        <span className="business_heading">About The  Business</span>
        <div className="row align-items-center abt-bsns">
          <div className="col-md-4 forlbl">
            Customer Email Address ?<span>(Optional)</span>
          </div>
          <div className="col-md-5 formail">
            <input
              className="customer_email_input"
              placeholder="Email Address"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="business_heading2">
        Insurance History
        </div>
        <div className="customer_email">
        Is the Business Currently insured?<br></br>
        <div className="row">
            <div className="col-md-4 dimtester forlbl">
            (Personal Auto policies in the owner’s name also qualify for prior insurance)            </div>
            <div className="col-md-5 d-flex align-items-center">
              <div className="radiobutns">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="currentlyInsured"
                    className="col-md-1 radio-input"
                    value="Yes"
                    onChange={() => setCurrentlyInsured(true)}
                    checked={currentlyInsured === true}
                  />
                  Yes
                </label>
                <label className="radio-label mx-4">
                  <input
                    type="radio"
                    name="currentlyInsured"
                    className="col-md-1 radio-input"
                    value="No"
                    onChange={() => setCurrentlyInsured(false)}
                    checked={currentlyInsured === false}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

        </div>
        {currentlyInsured ? (
        <>
          {/* Continuous Coverage Section */}
          <div className="row customercoverage">
            <div className="col-md-4 forlbl">
              Has the customer had continuous coverage? <span className="dimtester">(At least 1 year)</span>
            </div>
            <div className="col-md-5 d-flex align-items-center">
              <div className="radiobutns">
                {/* "Yes" option */}
                <label className="radio-label">
                  <input
                    type="radio"
                    name="continuousCoverage"
                    className="col-md-1 radio-input"
                    value="Yes"
                    onChange={() => setContinuousCoverage(true)}
                    checked={continuousCoverage === true}
                  />
                  Yes
                </label>
                {/* "No" option */}
                <label className="radio-label mx-4">
                  <input
                    type="radio"
                    name="continuousCoverage"
                    className="col-md-1 radio-input"
                    value="No"
                    onChange={() => setContinuousCoverage(false)}
                    checked={continuousCoverage === false}
                  />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* Bodily Injury Liability Limit Section */}
          <div className="row cstmremail">
            <div className="col-md-4 forlbl">
              <div className="customer_email">Currently Bodily injury Liability Limit</div>
            </div>
            <div className="col-md-5">
              <input
                className="customer_email_input"
                onChange={(e) => setBodilyInjuryLimit(e.target.value)}
                placeholder="$1,000,000 combined single limit"
              />
            </div>
          </div>

          {/* Current Policy Expiration Date Section */}
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="customer_email forlbl">Current Policy Expiration Date:</div>
            </div>
            <div className="col-md-5">
              <input
                type="date"
                className="customer_email_input"
                onChange={(e) => setPolicyExpirationDate(e.target.value)}
                placeholder="10/31/.2023"
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}        
        <div className="business_heading2">
        Insurance History
        </div>
        <div className="row mt-2">
            <div className="col-md-4 forlbl">
            Do you have an MC# or do you plan cross state lines?

            </div>
            <div className="col-md-5 d-flex align-items-center">
            <div className="radiobutns">
            <label className="radio-label">
              <input
                type="radio"
                name="option3"
                className="col-md-1 radio-input"
                value="Yes"
                onChange={() => setHasMCNumber(true)}
                checked={hasMCNumber === true}
              />
              Yes
            </label>
            <label className="radio-label mx-4">
              <input
                type="radio"
                name="option3"
                className="col-md-1 radio-input"
                value="No"
                onChange={() => setHasMCNumber(false)}
                checked={hasMCNumber === false}
              />
              No
            </label>
          </div>
   
             </div>
           
        </div>
        <div className="btns_position">
            <button className="back_button" onClick={() => handleNavigationClick("drivers")}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={() => handleNavigationClick("drivers")}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" onClick={handleButtonClick}>
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
       </div>
        </>
    )
}
export default AboutBusinessPage