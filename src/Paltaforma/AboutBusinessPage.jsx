
import "./business.css"
function AboutBusinessPage({ changeIcon,handleNavigationClick }){
  const handleButtonClick =()=>{
    changeIcon("fa-regular fa-circle-check green-icon")
    handleNavigationClick("coverages")
}
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
          <div className="col-md-4">
               Customer Email Address ?<span>(Optional)</span>
          </div>
          <div className="col-md-5 formail">
             <input className="customer_email_input" placeholder="Email Address"/>
          </div>
        </div>
        <div className="business_heading2">
        Insurance History
        </div>
        <div className="customer_email">
        Is the Customer Currently insured?<br></br>
        <div className="row">
            <div className="col-md-4">
            (Personal Auto policies also qualify of prior  insurance -except for For-Hire Livery)

            </div>
            <div className="col-md-5 d-flex align-items-center">
          <div className="radiobutns">
               <label className="radio-label">
        <input type="radio" name="option" className="col-md-1 radio-input" value="Yes" />
        Yes
      </label>
      <label className="radio-label mx-4">
        <input type="radio" name="option" className="col-md-1 radio-input" value="No" />
        No
      </label>
          </div>
   
             </div>
           
        </div>
        <div className="row mt-5">
            <div className="col-md-4">
            Has the customer had continous coverage?
            <span>(At least 1 year)</span>

            </div>
            <div className="col-md-5 d-flex align-items-center">
          <div className="radiobutns">
               <label className="radio-label">
        <input type="radio" name="option" className="col-md-1 radio-input" value="Yes" />
        Yes
      </label>
      <label className="radio-label mx-4">
        <input type="radio" name="option" className="col-md-1 radio-input" value="No" />
        No
      </label>
          </div>
   
             </div>
           
        </div>
      

        </div>
        <div className="row">
          <div className="col-md-4">
          <div className="customer_email">
        Currently Bodily injury Liability Limit
      

        </div></div>
        <div className="col-md-5">
        <input className="customer_email_input" placeholder="$1,000,000 combined single limit"/>

        </div>
          
        </div>
       <div className="row mt-3">
<div className="col-md-4">
<div className="customer_email">
        Current Policy Expiration Date:
        </div></div>
        <div className="col-md-5">
                  <input type="date" className="customer_email_input" placeholder="10/31/.2023"/>

        </div>
       </div>
       
      

        
        <div className="business_heading2">
        Insurance History
        </div>
        <div className="row mt-2">
            <div className="col-md-4">
            Do you have an MC# or do you plan cross state lines?

            </div>
            <div className="col-md-5 d-flex align-items-center">
          <div className="radiobutns">
               <label className="radio-label">
        <input type="radio" name="option" className="col-md-1 radio-input" value="Yes" />
        Yes
      </label>
      <label className="radio-label mx-4">
        <input type="radio" name="option" className="col-md-1 radio-input" value="No" />
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
              Contious &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
       </div>
        </>
    )
}
export default AboutBusinessPage