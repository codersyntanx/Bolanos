import React, { useState } from 'react';
function DriversPage({ changeIcon, handleNavigationClick }) {
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  const handleButtonClick = () => {
    changeIcon("fa-regular fa-circle-check green-icon");
  
      handleNavigationClick("about");
 
 
  };
const adddriver =()=>{
  setIsSectionVisible(!isSectionVisible);
}
  return (
    <>
    <div className="small-screen-header">
           <div className="Start_Nav d-flex">
        <div className="Page_Position gap-2 d-flex  align-items-center">
           
            <span className="circle_position"><span className="first_name">3</span><span className="outof">/5</span></span>
            <span className="Page_Name">Drivers</span>
           
        </div>
        <div className="next-page bsns-next">
            <span className="next-step">Next step</span>
            <span className="vehicles"  onClick={()=>{handleNavigationClick("about")}}>About business</span>

        </div>
       </div>
       </div>
      <div className="Driver_container">
        <div className={isSectionVisible ? "before_press" : "after_press"}>
          {isSectionVisible && (
            <>
              <p className="Device_information">Drive information</p>
              <p className="comontext">
                Most common vehicles for the customer’s business.
                <br />
                Please select one of these vehicles commonly used in the customer’s business or <br />
                choose ‘Other/Not Listed for more Options
              </p>
              <button className="Driver_button justify-content-center" onClick={adddriver}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" className="plus_svg" viewBox="0 0 24 24">
                  <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                </svg>{' '}
                Add a Driver
              </button>
            </>
          )}
        </div>
        {isSectionVisible && (
          <div className="btn_position">
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
        )}
        {!isSectionVisible && (
          <div className="after_press">
            <p className="question">A few more questions about Driver</p>
            <div className="row newdriver align-items-end">
              <label className="col-sm-3 lableforinput" htmlFor="fullName">
                Name:
              </label>
              <div className='namepart col-sm-8'>
              <div className="fnam">
                <input type="text" className="form-control" id="fullName" placeholder="Full Name" />
              </div>
              <div className="nmi">
                <input type="text" className="form-control" id="middleInitial" placeholder="MI" />
              </div>
              <div className="lnam">
                <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
              </div>
              </div>
             
            </div>
            <div className="row newdriver align-items-end">
            <div class="row newdriver align-items-end">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">Date of Birth::</label>
  <div class="col-sm-8">
    <input type="email" class="form-control "  placeholder="04/28/1995"/>
  </div>

</div>
<div class="row newdriver align-items-end">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">Driver’s License State:</label>
  <div class="col-sm-8">
    <input type="email" class="form-control "  placeholder="Maryland"/>
  </div>

</div>
<div class="row newdriver align-items-end">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">License Number:</label>
  <div class="col-sm-8">
    <input type="email" class="form-control "  placeholder="FRB34JU80005"/>
  </div>

</div>
            </div>
            <button className="Driver_button justify-content-center mt-4" onClick={adddriver}>
              <svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" className="plus_svg" viewBox="0 0 24 24">
                <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
              </svg>{' '}
              Add another Driver
            </button>
            <div className="btn_position">
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
          </div>
          
        )}
      </div>
    </>
  );
}

export default DriversPage;
