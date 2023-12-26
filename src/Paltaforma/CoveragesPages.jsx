import { useEffect, useState } from "react"
import "./coverage.css"
import truckdetail from "./images/insurance-truck.png"
import truck from "./images/Rectangle 34627019.png"
import truck2 from "./images/box truck.png"
import truck3 from "./images/cargo.png"
import truck4 from "./images/flatebed.png"
import unknown from "./images/unknown.png"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Select from 'react-select';
function CoveragesPage({ changeIcon,handleNavigationClick }){
    const [bolidly, setBolidly]=useState(true)
    const [uninsured, setUninsured]=useState("")
    const[bodilyinsurance,setBodilyinsurance]=useState("")
    const[nontrucking,setNontrucking]=useState("")
    const[personpro,setPersonpro]=useState("")
    const[motortruck,setMotortruck]=useState("")
    const[trailerinter,setTrailerinter]=useState("")
    const[general,setGeneral]=useState("")
    const[damage,setDamage]=useState("1000")
    const [vehicletable, setVehicletable] = useState([])
    const [informId, setInformId] = useState("")
const navigate = useNavigate()

    const postData = () => {
      if ( !bodilyinsurance || !personpro) {
        console.error('All fields must be filled');
        return;
      }
          const data = {
            informId,
        uninsured,
        bodilyinsurance,
        nontrucking,
        personpro,
        motortruck,
        trailerinter,
        general,
        damage,
      };
    
      // Make an axios call to post the data
      axios.post('https://serverforbce.vercel.app/api/postcoverage', data)
        .then((response) => {
          console.log('Data posted successfully:', response.data);
          navigate("/done")
          localStorage.removeItem("mainid")
        })
        .catch((error) => {
          console.error('Error posting data:', error);
        });
    };

    
const instead =()=>{
  setBolidly(!bolidly)
}

const handleComprehensiveChange = (vehicleId,e) => {
  const selectedValue = e.target.value;

  // Make axios call to update the value in the database
  updatecomprehensive(vehicleId, selectedValue);
};
// Function to make axios call and update coverage value in the database
const updateCoverageValue = (vehicleId, value) => {
  // Make axios call to update the database
  axios.put(`https://serverforbce.vercel.app/api/putvehicle/${vehicleId}`, {
    collision: value,
  })
      .then((response) => {
          console.log("Coverage value updated successfully");
      })
      .catch((error) => {
          console.error('Error updating coverage value:', error);
      });
};
const handleCollisionChange = (vehicleId, e) => {
  const selectedValue = e.target.value;

  // Make axios call to update the value in the database
  updateCoverageValue(vehicleId, selectedValue);
};
const updatecomprehensive = (vehicleId, value) => {
  // Make axios call to update the database
  axios.put(`https://serverforbce.vercel.app/api/putvehicle/${vehicleId}`, {
    comprehensive: value,
  })
      .then((response) => {
          console.log("comprehensive value updated successfully");
      })
      .catch((error) => {
          console.error('Error updating coverage value:', error);
      });
};







useEffect(() => {
  const informationId = localStorage.getItem("mainid");
  if (informationId) {
    setInformId(informationId);
  }
}, []);

useEffect(() => {
  if (informId) {
    axios.get(`https://serverforbce.vercel.app/api/getvehicalbyinforid/${informId}`)
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
const options = [
  { value: '$300,000 CSL', label: '$300,000 CSL' },
  { value: '$750,000 CSL', label: '$750,000 CSL' },
  { value: '$1,000,000 CSL', label: '$1,000,000 CSL' },
  { value: '$2,000,000 CSL', label: '$2,000,000 CSL' },
];
const nontruck = [
  { value: '$300,000 CSL', label: '$300,000 CSL' },
  { value: '$750,000 CSL', label: '$750,000 CSL' },
  { value: '$1,000,000 CSL', label: '$1,000,000 CSL' },
  { value: '$2,000,000 CSL', label: '$2,000,000 CSL' },
];
const handletrucking= (selectedOption) => {
  setBodilyinsurance(selectedOption.value);

};
const handleChange = (selectedOption) => {
  setNontrucking(selectedOption.value);

};

const insured = [
  { value: '$100k', label: '$100k' },
  { value: '$85k', label: '$85k' },
  { value: '$60k', label: '$60k' },

];

const handleinsured = (selectedOption) => {
  setBodilyinsurance(selectedOption.value);

  // Use selectedOption instead of selectedValue
  if (selectedOption.value === "$100k") {
    setDamage("1000");
  } else if (selectedOption.value === "$85k") {
    setDamage("500");
  } else if (selectedOption.value === "$60k") {
    setDamage("250");
  }
};
const protect = [
  { value: '2500', label: '2500' },
  { value: '2500 guest pip', label: '2500 guest pip' },
];
const handleprotect= (selectedOption) => {
  setPersonpro(selectedOption.value);

};
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
          <div className="col-md-5 ">
          <Select
        // className="customer_slect"
        options={options}
        onChange={handleChange}
      />


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
          <Select
        // className="customer_slect"
        options={nontruck}
        onChange={handletrucking}
      />
          

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
    Uninsured/underinsured Motorist Bodily injury*
  </div>
  <div className="col-md-5">
  <Select
        // className="customer_slect"
        options={insured}
        onChange={handleinsured}
      />
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
          <Select
        // className="customer_slect"
        options={protect}
        onChange={handleprotect}
      />
          

          </div>
        </div>
     </div>
     <div className="Insurance_type">
     <div className="coverage_heading">
               Special Coverages related to the Customer’s Business
        </div>

        <div className="row bluediv2 align-items-center">
<div className="col-md-1"></div>
        <div className="col-md-3 d-flex jus moto-truck-cargo-txt">
        Motor Truck Cargo
        <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
          </div>
          <div className="col-md-5 smalinput">
             <select className="customer_slect" onChange={(e)=>{setMotortruck(e.target.value)}}>
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
         <div className="col-md-3 jus d-flex minustext">
            Trailer Interchange   <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
          </div>
          <div className="col-md-4">
          <div className="col-md-5 smalinput">
             <select className="customer_slect" onChange={(e)=>{setTrailerinter(e.target.value)}}>
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
        <div className="col-md-3 jus d-flex gnrlliabtext">
        General Liabilty &nbsp;&nbsp;&nbsp;
        <div className="circle2">
            <i class="fa-solid fa-question" style={{color:"white"}}></i>
            </div>
          </div>
          <div className="col-md-7">
             <select className="customer_slect2" onChange={(e)=>{setGeneral(e.target.value)}}>
                <option className="optionval">Not Selected</option>
                <option className="optionval">$700k CSL</option>
                <option className="optionval">$600k CSL</option>
                <option className="optionval">$550k CSL</option>

             </select>
          

          </div>
        
        </div>
     </div>
     {
      vehicletable.map((vehicle)=>{
        return(
          <>
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
                <span  className="detail" > {vehicle.Vin} </span><br></br>
            </div>
        </div>
        <div className="row bluediv2 align-items-center">
                <div className="col-md-4">
                    Comprehensive?
                </div>
                <div className="col-md-5">
                    <select className="customer_slect" onChange={(e) =>handleComprehensiveChange(vehicle._id, e)}>
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
  <select className="customer_slect" onChange={(e) => handleCollisionChange(vehicle._id, e)}>
    <option className="optionval">$1,000 Deductible</option>
    <option className="optionval">$700k CSL</option>
    <option className="optionval">$600k CSL</option>
    <option className="optionval">$550k CSL</option>
  </select>
</div>
            </div>
        <div className="row bluediv4 align-items-center">
        <div className="col-md-4">
        If this vehicle was sold today,how much would it be worth (excluding any permanent attached equipment)?
          </div>
          <div className="col-md-5">
           

          <span  className="detail" > {vehicle.vehicleWorth} </span><br></br>

          </div>
          
        </div>
     </div>
          </>
        )
      })
     }

     <div className="last_btns">
     <div className="btns_position">
            <button className="back_button" onClick={() => handleNavigationClick("about")}>
              {' '}
              Back &nbsp;&nbsp;
            </button>
            <button className="small-screen" onClick={() => handleNavigationClick("about")}>
              {' '}
              <i class="fa-solid fa-angle-left"></i>
            </button>
            <button className="continous_button" onClick={postData}>
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
     </div>
</>

    
    )
}
export default CoveragesPage