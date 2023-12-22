import { useEffect, useState } from "react"
import "./coverage.css"
import truckdetail from "./images/insurance-truck.png"
import truck from "./images/Rectangle 34627019.png"
import truck2 from "./images/box truck.png"
import truck3 from "./images/cargo.png"
import truck4 from "./images/flatebed.png"
import unknown from "./images/unknown.png"
import axios from "axios"

function CoveragesPage({ changeIcon,handleNavigationClick }){
    const [bolidly, setBolidly]=useState(true)
    const [uninsured, setUninsured]=useState("")
    const[damage,setDamage]=useState("1000")
    const [vehicletable, setVehicletable] = useState([])
    const [informId, setInformId] = useState("")
const instead =()=>{
  setBolidly(!bolidly)
}
const handleinsured = (e) => {
  const selectedValue = e.target.value;

  setUninsured(selectedValue);

  if (selectedValue === "$100k") {
    setDamage("1000");
  } else if (selectedValue === "$85k") {
    setDamage("500");
  } else if (selectedValue === "$60k") {
    setDamage("250");
  }
};


useEffect(() => {
  const informationId = localStorage.getItem("mainid");
  if (informationId) {
    setInformId(informationId);
  }
}, []);

useEffect(() => {
  if (informId) {
    axios.get(`http://localhost:3003/getvehicalbyinforid/${informId}`)
      .then(res => {
        if (res.data.status === true) {
          setVehicletable(res.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching vehicle data:', error);
        // Handle the error, e.g., display an error message to the user
      });
  }
}, [informId]);
console.log(vehicletable)
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

 <div className="coverage_first">
        <div className="coverage_heading">
        Coverages applied to all vehicles
        </div>

        {
          bolidly?(
            <>
              <div className="row bluediv align-items-center">
        <div className="col-md-4">
        Bodily injury and Property Damage Liability
          </div>
          <div className="col-md-5">
             <select className="customer_slect">
                <option className="optionval">$300,000 CSL</option>
                <option className="optionval">$750,000 CSL</option>
                <option className="optionval">$1,000,000 CSL</option>
                <option className="optionval">$2,000,000 CSL</option>

             </select>


          </div>
        </div>
        <div className="mt-3">
        <div className="underlinetext" onClick={instead}>Add Non-Trucking Liability instead?</div>




        
        </div>

            </>
          ):(
            <>
              <div className="row bluediv align-items-center">
        <div className="col-md-4">
        Non-Trucking Liability 
        Bodily injury and Property Damage Liability
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
        <div className="underlinetext" onClick={instead}>Add Bodily injury and Property Damage Liability instead?</div>

        </div>
            </>
          )
        }
      
      <div className="row bluediv2 align-items-center">
  <div className="col-md-4">
    Uninsured/underinsured Motorist Bodily injury* {uninsured}
  </div>
  <div className="col-md-5">
    <select className="customer_slect" onChange={handleinsured}>
      <option className="optionval">$100k</option>
      <option className="optionval">$85k</option>
      <option className="optionval">$60k</option>
    </select>
  </div>
</div>

<div className="row bluediv3 align-items-center">
  <div className="col-md-4">
    Uninsured Motorist Property<br></br> Damage*
  </div>
  <div className="col-md-5">
    Included in UM/UIM BI CSL w/${damage} Deductible
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
     <div className="Insurance_type">
     <div className="coverage_heading">
               Special Coverages related to the Customer’s Business
        </div>

        <div className="row bluediv2 align-items-center">
<div className="col-md-1"></div>
        <div className="col-md-3 d-flex moto-truck-cargo-txt">
        Motor Truck Cargo? 
        <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
          </div>
          <div className="col-md-5 smalinput">
             <select className="customer_slect">
                <option className="optionval">Not Selected</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>

        </div>
        <div className="row mt-4 trailer-small-screen">
         <div className="col-md-1 minussign">
           
            
         </div>
         <div className="col-md-3 d-flex minustext">
            Trailer Interchange ?  <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
          </div>
          <div className="col-md-4">
          <div className="col-md-5 smalinput">
             <select className="customer_slect">
                <option className="optionval">Not Selected</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
        </div>
   

        </div>
        <div className="row bluediv2 align-items-center">
         <div className="col-md-1 circle-outer">
        
         </div>
        <div className="col-md-3 d-flex gnrlliabtext">
        General Liabilty &nbsp;&nbsp;&nbsp;
        <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
          </div>
          <div className="col-md-7">
             <select className="customer_slect">
                <option className="optionval">Not Selected</option>
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
            <button className="continous_button">
              Contious &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
     </div>
</>

    
    )
}
export default CoveragesPage