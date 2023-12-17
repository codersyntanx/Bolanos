import { useState } from "react";
import truck from "./images/Rectangle 34627019.png"
import truck2 from "./images/Rectangle 34627020.png"
import truck3 from "./images/Rectangle 34627021.png"
import truck4 from "./images/Rectangle 34627022.png"
import truck5 from "./images/Rectangle 34627023.png"
import unknown from "./images/unknown.png"
import Modal from "./Modal"
import "./Table.css"
function VehiclesPage({ changeIcon, handleNavigationClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [distance, setDistance] = useState('');
  const [loanLease, setLoanLease] = useState('');
  const [needCoverage, setNeedCoverage] = useState('');
  const [equipmentValue, setEquipmentValue] = useState('');
  const [vehicleWorth, setVehicleWorth] = useState('');
  const [vehicalby, setVehicalby]=useState("")
  const [Vin, setVin]=useState("")



  const handleRadio = (event) => {
    setVehicalby(event.target.value);
};
const handleLoanLease = (event) => {
  setLoanLease(event.target.value);
};
const handleCoverage = (event) => {
  setNeedCoverage(event.target.value);
};
console.log(loanLease)
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    setIsConfirmed(true);
    setIsModalOpen(false);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    // Check if all fields are filled
    if (!selectedTruck || !selectedVehicle || !zipCode || !distance || !loanLease || !needCoverage || !equipmentValue || !vehicleWorth || !vehicalby ) {
      // Show an error message or handle the error in your preferred way
      alert("Please fill in all fields before continuing.");
      return;
    }
  
    // If all fields are filled, save data in local storage
    const postData = {
      selectedTruck,
      selectedVehicle,
      zipCode,
      distance,
      loanLease,
      needCoverage,
      equipmentValue,
      vehicleWorth,
      vehicalby
    };
  
    // Save data in local storage
    localStorage.setItem('vehiclesPageData', JSON.stringify(postData));
  
    // Perform post request here if needed
    // ...
  
    // Navigate to the next page
    changeIcon('fa-regular fa-circle-check green-icon');
    handleNavigationClick('drivers');
  };
  

  const truckData = [
    { title: 'Truck Tractor ', image: truck },
    { title: 'Box Truck', image: truck2 },
    { title: 'Pickup Truck', image: truck3 },
    { title: 'Flatbed Truck', image: truck4 },
    { title: 'Cargo Van', image: truck5 },
    { title: 'Other/ Not listed', image: unknown },
  ];
  

  const handleTruckClick = (title) => {
    setSelectedTruck(title);
  };

  const isTruckSelected = (title) => {
    return selectedTruck === title;
  };

  const rows = [
    // { Vehicle: "2019 ford f350 1ft8w3ct9ct", Comp: 'N/A', 'Fire & Theft': "N/A", Coll: 'N/A', StatedAmt: "$0" },
  ];

  const handleRadioChange = (rowId) => {
    setSelectedVehicle(rowId);
  };

  return (
    <>
     <div className="small-screen-header">
           <div className="Start_Nav d-flex">
        <div className="Page_Position gap-2 d-flex  align-items-center">
           
            <span className="circle_position"><span className="first_name">2</span><span className="outof">/5</span></span>
            <span className="Page_Name">Vehicles</span>
           
        </div>
        <div className="next-page">
            <span className="next-step">Next step</span>
            <span className="vehicles"  onClick={()=>{handleNavigationClick("drivers")}}>Drivers</span>

        </div>
       </div>
       </div>
    {
      !isConfirmed?(

        <div className="Driver_container">
        <div className="before_press">
          <p className="Device_information">Vehicle Information</p>
          <p className="comontext">
            Most common vehicles for the customer’s business.
            <br />
            Please select one of these vehicles commonly used in the customer’s business or
            <br />
            choose ‘Other/Not Listed for more Options
          </p>
          {rows.length > 0 && (
             <table className='main_table mt-5 mb-5'>
            
            <thead className='table_header'>
              <tr >
                <th className='idtr'>
                <input
                      className='checkboxcss'
                      type="checkbox"
                      name="selectedStatedAmt"
                    />
                  Vehicle</th>
                <th>Comp</th>
                <th>Fire & Theft</th>
                <th>Coll</th>
                <th className='idtr'>StatedAmt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.Vehicle}>
                  <td className="tabltd">
                  <input
                      className='checkboxcss'
                      type="checkbox"
                      name="selectedStatedAmt"
                      checked={selectedVehicle === row.Vehicle}
                      onChange={() => handleRadioChange(row.Vehicle)}
                    />
                    {row.Vehicle}
                  </td>
                  <td>{row.Comp}</td>
                  <td>{row['Fire & Theft']}</td>
                  <td >{row.Coll}</td>
                  <td className="tabltd">
                    <input
                      className='checkboxcss'
                      type="checkbox"
                      name="selectedStatedAmt"
                      checked={selectedVehicle === row.Vehicle}
                      onChange={() => handleRadioChange(row.Vehicle)}
                    />
                    {row.StatedAmt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
             {rows.length > 0 && (
              <div className="table_small_screen">
  {
    rows.map((row)=>{
      return(
        <>
        <table>
          <tr className="border-bottom">
            <td className="table_heading_secction">Vehicle</td>
            <td className="table_description">{row.Vehicle}</td>
          </tr>
          <tr >
            <td className="table_heading_secction">Comp</td>
            <td className="table_description">{row.Comp}</td>
          </tr>
          <tr >
            <td className="table_heading_secction">Fire & Thef</td>
            <td className="table_description">{row['Fire & Theft']}</td>
          </tr>
          <tr >
            <td className="table_heading_secction">coll</td>
            <td className="table_description">{row.Coll}</td>
          </tr>
          <tr >
            <td className="table_heading_secction">StatedAmt</td>
            <td className="table_description tabltd">   
                    {row.StatedAmt}</td>
          </tr>
        </table>
        </>
      )
    })
  }
</div>
             )}

          <button className="Driver_button justify-content-center mt-3" onClick={openModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" className="plus_svg" viewBox="0 0 24 24">
              <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
            </svg>{' '}
            {rows.length > 0 ? " Add another Vehicle" : " Add a Vehicle"}
          </button>
        </div>

        <div className="btn_position">
          <button className="back_button" onClick={() => handleNavigationClick("start")}>
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
      ):(
        <div className="add_vehicle">
          <div className="row vehicltyp">
            <div className="col-md-3 vehicle_type">
            Vehicle Type
            </div>
            <div className="col-md-3 vehicle_typeans">
{selectedTruck}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3 vehicle_type">
            Add Vehicle By
            </div>
            <div className="col-md-7 vehicle_typeans">
        
  <input className="inputfield" type="radio" id="age1" name="age1"
                                onChange={handleRadio} defaultValue={"Year,Make Model"} />
  <label className="loanlbl" htmlFor="age1">Year,Make Model</label>

  <input className="mx-2 inputfield"  type="radio" id="age2" name="age1" 
                                onChange={handleRadio} defaultValue={"VIN"} />
  <label className="loanlbl" htmlFor="age2">VIN</label>

            </div>
          </div>
          <div className="textcon mt-4">
          Vehicle Identification Number(VIN)
          </div>
          <div className="row mt-2">
            <div className="col-md-4">
              <input className="text_input" onChange={(e)=>{setVin(e.target.value)}} type="text"/>
            </div>
            <div className="col-md-3">
              <button className="btn_vin">
              Lookup VIN
              </button>
            </div>
          </div>
          <div className="tip_content mt-3">
            <span className="tips">Tips:</span><br></br>
            <span className="all_tip">
            Every VIN has 17 alpha/numeric characters<br></br>
            The letter I,O,and Q are never used.<br></br>
            At least 6 character are numeric.<br></br>
            Common typing mistake are B for 8,S for 5,0 for 0 1 for i or vice versa<br></br>
            </span>
          </div>
          <div className="row mt-5 align-items-center">
            <div className="col-md-4 inputfieldrow">
            Zip Code where the vehicle is located?
            </div>
            <div className="col-md-4">
              <input className="text_input px-3" onChange={(e)=>{setZipCode(e.target.value)}} placeholder="20744" type="text"/>
            </div>
          </div>
          <div className="row mt-4 ">
            <div className="col-md-4 inputfieldrow">
            Farthest one-way distance this vehicle typically travels(90% or more of the <br></br> time)
            </div>
            <div className="col-md-4">
              <input className="text_input px-3" onChange={(e)=>{setDistance(e.target.value)}}  type="text"/>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4 inputfieldrow">
            Is there a loan/lease on this vehicle?
            </div>
            <div className="col-md-7 vehicle_typeans typeans">
        
  <input className="inputfield" type="radio" id="age2" name="age3" onChange={handleLoanLease} defaultValue={"Yes- Loan"} />
  <label className="loanlbl" htmlFor="age1">Yes- Loan</label>

  <input className="mx-2 inputfield"  type="radio" id="age2" name="age3"  onChange={handleLoanLease} defaultValue={"Yes-Lease"} />
  <label className="loanlbl" htmlFor="age2">Yes-Lease</label>
  <input className="mx-2 inputfield"  type="radio" id="age2" name="age3"  onChange={handleLoanLease} defaultValue={"No"} />
  <label className="loanlbl" htmlFor="age2">No</label>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4 inputfieldrow">
            Does the customer need comprehensive or collision coverage to protect this vehicle in an accident or loss?
            </div>
            <div className="col-md-7 vehicle_typeans ">
        
  <input className="inputfield" type="radio" id="age1" name="age4" onChange={handleCoverage} defaultValue={"Yes- Loan"} />
  <label className="loanlbl" htmlFor="age1">Yes- Loan</label>

  <input className="mx-2 inputfield"  type="radio" id="age2" name="age4" onChange={handleCoverage} defaultValue={"Yes-Lease"} />
  <label className="loanlbl" htmlFor="age2">Yes-Lease</label>

            </div>
          </div>


          <div className="row mt-3">
            <div className="col-md-4 inputfieldrow">
            What is the value of the permanent attached equipment?            </div>
            <div className="col-md-5 vehicle_money">
        
    $0
            </div>
          </div>
          <div className="heading_vehicle_add mt-4">
          Vehicle has no equipment
          </div>
        
          <div className="row mt-4 align-items-center">
            <div className="col-md-4 inputfieldrow">
            If this vehicle was sold today,how much would it be worth (excluding any permanent attached equipment)?
            </div>
            <div className="col-md-4">
              <input className="text_input px-3" placeholder="$45,000" type="text" onChange={(e)=>{setVehicleWorth(e.target.value)}} />
            </div>
          </div>
          <div className="row mt-3 align-items-center">
            <div className="col-md-4 inputfieldrow">
            Total stated amount (including permanently attached equipment)
            </div>
            <div className="col-md-4 vehicle_money">
            <input className="text_input px-3" placeholder="$45,000" onChange={(e)=>{setVehicleWorth(e.target.value)}} type="text"/>
            </div>
          </div>
          <div className="btns_position">
          <button className="back_button" onClick={() => handleNavigationClick("start")}>
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
      )
    }
     
      <Modal isOpen={isModalOpen} onClose={closeModal}>
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
        <div className="d-flex btn-postion mt-5">

          <button className="closebtn"onClick={closeModal}>Cancel</button>
        <button className="confirmbtn mx-3" onClick={handleConfirm}>Confirm</button>
        </div>
        

      </Modal>

    </>
  );
}

export default VehiclesPage;
