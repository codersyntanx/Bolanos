import { useState } from "react"
import "./coverage.css"
import truckdetail from "./images/insurance-truck.png"
import truck from "./images/Rectangle 34627019.png"
import truck2 from "./images/box truck.png"
import truck3 from "./images/cargo.png"
import truck4 from "./images/flatebed.png"
function CoveragesPage({ changeIcon,handleNavigationClick }){
    const [isopened, setIsopned]=useState(true)
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedTruck, setSelectedTruck] = useState(null);
    const truckData = [
      { title: 'Truck Tractor ', image: truck },
      { title: 'Box Truck', image: truck2 },
      { title: 'Pickup Truck', image: truck3 },
      { title: 'Flatbed Truck', image: truck4 },
      { title: 'Cargo Truck', image: truck3 },
    ];
    const newpage=()=>{
        setIsopned(!isopened)
    }
    const handleTruckClick = (title) => {
      setSelectedTruck(title);
    };
    const isTruckSelected = (title) => {
      return selectedTruck === title;
    };
    const handleButtonClick =()=>{
      changeIcon("fa-regular fa-circle-check green-icon")
      handleNavigationClick("coverages")
  }
    return(
        <>
         <div className="small-screen-header">
           <div className="Start_Nav d-flex">
        <div className="Page_Position gap-2 d-flex  align-items-center">
           
            <span className="circle_position"><span className="first_name">5</span><span className="outof">/5</span></span>
            <span className="Page_Name" onClick={()=>{handleNavigationClick("about")}}>About Business</span>
           
        </div>
        <div className="next-page">
            <span className="next-step"></span>
            <span className="vehicles"></span>

        </div>
       </div>
       </div>
        {
            isopened?(
<>
 <div className="coverage_first">
        <div className="coverage_heading">
        Coverages applied to all vehicles
        </div>
        <div className="row bluediv align-items-center">
        <div className="col-md-4">
        Currently Bodily injury and Property Damage Liability
          </div>
          <div className="col-md-5">
             <select className="customer_slect">
                <option className="optionval">$750k CSL</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
        </div>
        <div className="mt-3">
        <div className="underlinetext">Add Non-Trucking Liability instead?</div>
        <div className="row bluediv2 align-items-center">
        <div className="col-md-4">
        Uninsured/underinsured Motorist Bodily injury*
          </div>
          <div className="col-md-5">
             <select className="customer_slect">
                <option className="optionval">$750k CSL</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
        </div>
        </div>


        <div className="row bluediv3 align-items-center">
        <div className="col-md-4">
        Uninsured  Motorist Property<br></br> Damage*
          </div>
          <div className="col-md-5">
          Included in UM/UIM BI CSL w/$250 Deductible
          

          </div>
        </div>
        <div className="row bluediv2 align-items-center">
        <div className="col-md-4">
        Personal injury Protection?
          </div>
          <div className="col-md-5">
             <select className="customer_slect">
                <option className="optionval">$ 2,500 Guest PIP</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
        </div>
     </div>
     <div className="vehicle_coverage">
     <div className="coverage_heading">
     Coverages for the vehicles
        </div>
        <div className="row truck_detail">
            <div className="col-md-4">
                <img src={truckdetail} alt="your truck" width="100%"/>
            </div>
            <div className="col-md-5 ">
            <span className="detailing">2021 Freightliner Casca...</span><br></br>
                <span  className="detail" > 3AKHFHDUDDJJ2660 </span><br></br>
                <span  className="detailing">$25,114.00</span>
            </div>
        </div>
        <div className="row bluediv2 align-items-center">
        <div className="col-md-4">
        Comprehensive?
          </div>
          <div className="col-md-5">
             <select className="customer_slect">
                <option className="optionval">$1,000 Deductible</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
        </div>
        <div className="row bluediv3 align-items-center">
        <div className="col-md-4">
        Collision?
          </div>
          <div className="col-md-5">
          $1,000 Deductible
          

          </div>
        </div>
        <div className="row bluediv4 align-items-center">
        <div className="col-md-4">
        If this vehicle was sold today,how much would it be worth (excluding any permanent attached equipment)?
          </div>
          <div className="col-md-5">
           
             <input className="customer_slect" placeholder="$45,000"/>


          </div>
          
        </div>
        <div className="btns_position">
            <button className="back_button" onClick={() => handleNavigationClick("about")}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={() => handleNavigationClick("about")}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" onClick={newpage}>
              Contious &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
     </div>
</>

            ):(
                <>
               <div className="newpage">
               <div className="coverage_heading">
               Special Coverages related to the Customer’s Business
        </div>

        <div className="row bluediv2 align-items-center">
         <div className="col-md-1 moto-truck-cargo-crcl">
         <div className="circle">
         <i class="fa-solid fa-plus" style={{color:"white"}}></i>
            </div>
         </div>
        <div className="col-md-3 moto-truck-cargo-txt">
        Motor Truck Cargo?
          </div>
          <div className="col-md-5 smalinput">
             <select className="customer_slect">
                <option className="optionval">Not Selected</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
          <div className="col-md-2 smalltxt">
          $0.00
          </div>
        </div>
        <div className="row mt-4 trailer-small-screen">
         <div className="col-md-1 minussign">
            <div className="circle">
            <i class="fa-solid fa-minus" style={{color:"white"}}></i>
            </div>
            
         </div>
         <div className="col-md-3 minustext">
            Trailer Interchange ?
          </div>
        </div>
        <div className="row mt-4 intercoverpart">
            <div className="col-md-5">
            Do you require Trailer interchange Coverage?

            </div>
            <div className="col-md-1">
               <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
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
        <div className="row bluediv3 align-items-center">
        
        <div className="col-md-4">
        Number of Non-Owned Trailers
          </div>
          <div className="col-md-4">
             <select className="customer_slect">
                <option className="optionval">1</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>

        </div>
        <div className="coverage_heading2">
        Non - owned Tralier Type
        </div>

        <div className="textval">
        Please select the type of Non-Owned trailer(s) used in the customer’s business uses mutiple Non-Owned traliers,<br></br>
please the most used trailer type.

        </div>
        <div className="row">
        <div className="truck_wrap gap-4">
          {truckData.map((truck, index) => (
            <div key={index} className={`truck_border ${isTruckSelected(truck.title) ? 'selected' : ''}`} onClick={() => handleTruckClick(truck.title)}>
              <img src={truck.image} alt="truck" />
              <span className="card_title">{truck.title}</span>
              <div className="radio_button">
                {isTruckSelected(truck.title) ? <i className="fa-solid fa-circle-check green-icon green_check"></i> : <i className="fa-solid fa-circle green_check text-secondary"></i>}
              </div>
            </div>
          ))}

        </div>
        </div>

        <div className="row bluediv2 align-items-center">
         <div className="col-md-1 circle-outer">
         <div className="circle">
         <i class="fa-solid fa-plus" style={{color:"white"}}></i>
            </div>
         </div>
        <div className="col-md-3 d-flex gnrlliabtext">
        General Liabilty &nbsp;&nbsp;&nbsp;
        <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
          </div>
          <div className="col-md-5">
             <select className="customer_slect">
                <option className="optionval">Not Selected</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
          <div className="col-md-2">
          $0.00
          </div>
        </div>
        <div className="btns_position">
            <button className="back_button" onClick={newpage}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={newpage}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" >
              Contious &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
               </div>
                </>
            )
        }
    
        </>
    )
}
export default CoveragesPage