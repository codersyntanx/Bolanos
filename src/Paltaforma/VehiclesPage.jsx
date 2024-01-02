import { useEffect, useState } from "react";
import truck from "./images/Rectangle 34627019.png"
import truck2 from "./images/Rectangle 34627020.png"
import truck3 from "./images/Rectangle 34627021.png"
import truck4 from "./images/Rectangle 34627022.png"
import truck5 from "./images/Rectangle 34627023.png"
import unknown from "./images/unknown.png"
import Modals from "./Modal"
import "./Table.css"
import { Modal,Skeleton } from 'antd';
import {notification } from 'antd';
import { Modal as AntModal } from 'antd';


import axios from "axios";
function VehiclesPage({ changeIcon, handleNavigationClick }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [distance, setDistance] = useState('');
  const [needCoverage, setNeedCoverage] = useState('');
  const [vehicleWorth, setVehicleWorth] = useState('');
  const [vehicalby, setVehicalby] = useState("Vin")
  const [Vin, setVin] = useState("")
  const [year, setYear] = useState("")
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [vehicletable, setVehicletable] = useState([])
  const [informId, setInformId] = useState("")
  const[updatevehicle,setUpdatevehicle]=useState(false)
  const[vehicleid,setVehicleid]=useState("")
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [loading,setLoading]=useState(false)
  const [vinresponse,setVinresponse]=useState("")
  const openNewModal = () => {
    setNewModalVisible(true);
  };
  
  const closeNewModal = () => {
    setVin("")
    setNewModalVisible(false);
  };
  const doneNewModal = () => {
    setNewModalVisible(false);
    openNotification('success', 'Vin Added Successfully');

  };
  
  const handleRadio = (event) => {
    setVehicalby(event.target.value);
  };

  const lookupvinnumber = () => {
    // Set loading to true when the function starts
    setLoading(true);
    openNewModal()
    // Perform the API request
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${Vin}?format=json`)
      .then(res => {
        // Handle the response data
        setMake(res.data.Results[7].Value);
        setYear(res.data.Results[10].Value);
        setModel(res.data.Results[9].Value);
        setVinresponse(res.data.Results)
      })
      .catch(error => {
        // Handle errors if needed
        console.error('Error fetching VIN information:', error);
      })
      .finally(() => {
        // Set loading to false when the request completes (either success or failure)
        setLoading(false);
      });
  };
  

  const handleCoverage = (event) => {
    setNeedCoverage(event.target.value);
  };
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
const gotonext =()=>{
  changeIcon('fa-regular fa-circle-check green-icon');
  handleNavigationClick('drivers');
}
  const truckData = [
    { title: 'Truck Tractor ', image: truck },
    { title: 'Box Truck', image: truck2 },
    { title: 'Pickup Truck', image: truck3 },
    { title: 'Flatbed Truck', image: truck4 },
    { title: 'Cargo Van', image: truck5 },
    { title: 'Trailer', image: unknown },
    { title: 'Other/ Not listed', image: unknown },
  ];
  const handleTruckClick = (title) => {
    setSelectedTruck(title);
  };
  const isTruckSelected = (title) => {
    return selectedTruck === title;
  };
  useEffect(() => {
    const informationId = localStorage.getItem("mainid");
    if (informationId) {
      setInformId(informationId);
    }
  }, []);

  useEffect(() => {
    fetchvehicle()
  }, [informId]);
const fetchvehicle =()=>{
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
}

const [modalVisible, setModalVisible] = useState(false);
const [deleteId, setDeleteId] = useState(null);

const handleDelete = async (id) => {
  setDeleteId(id);
  setModalVisible(true);
};
const handleModalCancel = () => {
  setModalVisible(false);
  setDeleteId(null);
};
const handleModalOk = async () => {
  try {
    const response = await axios.delete(`https://serverforbce.vercel.app/api/deletebyid/${deleteId}`);
    
    if (response.data.status === true) {
      // Remove the deleted vehicle from the table
      setVehicletable(prevTable => prevTable.filter(row => row._id !== deleteId));
      openNotification('success', 'Vehicle Deleted Successfully');

    } else {
      console.error('Error deleting vehicle:', response.data.error);
      // Handle the error, e.g., display an error message to the user
      openNotification('error', 'Error Deleting Vehicle', response.data.error);
    }
  } catch (error) {
    console.error('Error deleting vehicle:', error);
    // Handle the error, e.g., display an error message to the user
    openNotification('error', 'Error Deleting Vehicle',"Any unexpected Error Occur");
  } finally {
    setModalVisible(false);
  }
};
  const openNotification = (type, message, description = '') => {
    notification[type]({
      message,
      description,
    });
  };
  const handleEdit = (vehicle) => {
    setUpdatevehicle(true)   
    setIsConfirmed(true);
    setVehicleid(vehicle._id)
    setSelectedTruck(vehicle.selectedTruck);
    setZipCode(vehicle.zipCode);
    setDistance(vehicle.distance);
    setNeedCoverage(vehicle.needCoverage);
    setVehicleWorth(vehicle.vehicleWorth);
    setVehicalby(vehicle.vehicalby);
    setVin(vehicle.Vin);
    setYear(vehicle.year);
    setMake(vehicle.make);
    setModel(vehicle.model);
  
    // Set any other fields you have in your modal
    setIsModalOpen(true);
  };
  
  const handleButtonClick = () => {
    // Check if all fields are filled
    const requiredFields = ["selectedTruck", "zipCode", "distance", "needCoverage", "vehicleWorth", "vehicalby", "Vin"];
    const missingFields = [];
  
    // Check if all fields are filled
    requiredFields.forEach(field => {
      if (!eval(field)) {
        missingFields.push(field);
      }
    });
  
    if (missingFields.length > 0) {
      openNotification('error', `Please fill in the following fields before continuing`);
      return;
    }
  
    const postData = {
      informId, // If informId is present, it means you're editing; otherwise, it's a new vehicle
      selectedTruck,
      zipCode,
      distance,
      needCoverage,
      vehicleWorth,
      vehicalby,
      year,
      make,
      model,
      Vin,
    };
  
    const url = updatevehicle ? `https://serverforbce.vercel.app/api/putvehicle/${vehicleid}` : "https://serverforbce.vercel.app/api/postvehicle";

    const axiosMethod = updatevehicle ? axios.put : axios.post;
    
    axiosMethod(url, postData)
      .then(res => {
        if (res.status === 200 && res.data.status === true) {
          // Navigate to the next page if needed
          setIsConfirmed(false);
          fetchvehicle();
          setUpdatevehicle(false)
          openNotification('success', informId ? `Vehicle Updated Successfully` : `Vehicle Added Successfully`);
          setVehicleid("")
    setSelectedTruck("");
    setZipCode("");
    setDistance("");
    setNeedCoverage("");
    setVehicleWorth("");
    setVehicalby("");
    setVin("");
    setYear("");
    setMake("");
    setModel("");
        } else {
          console.error("Unexpected server response:", res);
          alert("Error while processing the request. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error during request:", error);
        alert("Error during request. Please try again.");
      });
  };
  
  const formatNumberWithCommas = (value) => {
    // Remove existing commas and dollar sign
    const cleanedValue = value.replace(/[$,]/g, '');

    // Format the number with commas
    const formattedValue = Number(cleanedValue).toLocaleString();

    // Add dollar sign and return the result
    return `$ ${formattedValue}`;
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Update the state with the formatted value
    setVehicleWorth(formatNumberWithCommas(inputValue));
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
            <span className="vehicles" onClick={() => { handleNavigationClick("drivers") }}>Drivers</span>

          </div>
        </div>
      </div>
      {
        !isConfirmed ? (

          <div className="Driver_container">
            <div className="before_press">
              <p className="Device_information">Vehicle/Trailer Information</p>
              <p className="comontext">
                Please select one of these vehicles/trailers used in your business <br></br>
                <span className="dimtext">(Choose Other/Not Listed for more Options)</span>
              </p>
              {vehicletable.length > 0 && (
        <table className='main_table mt-1 mb-5'>
          <thead className='table_header'>
            <tr>
              <th className='idtr'>Vehicle</th>
              <th>Comp</th>
              <th>Coll</th>
              <th>VIN#</th>
              <th className='idtr'>Stated Amt</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicletable.map((row) => (
              <tr key={row._id}>
                <td >
                  {row.year} {row.model} {row.make}
                </td>
                <td>{row.needCoverage}</td>
                <td>{row.needCoverage}</td>
                <td>{row.Vin}</td>
                <td >
                  {row.vehicleWorth}
                </td>
                <td>
                <button className="btn" onClick={() => handleEdit(row)}>
  <i className="fa-regular fa-pen-to-square"></i>
</button>
<button className="btn" onClick={() => handleDelete(row._id)}>
<i class="fa-solid fa-trash-can"></i>
</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
              {vehicletable.length > 0 && (
                <div className="table_small_screen">
                  {
                    vehicletable.map((row) => {
                      return (
                        <>
                          <table>
                            <tr style={{borderBottom:"1px solid black"}}>
                              <td className="table_heading_secction">Vehicle</td>
                              <td className="table_description">{row.year},{row.make},{row.model}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">Comp</td>
                              <td className="table_description">{row.needCoverage}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">Coll</td>
                              <td className="table_description">{row.needCoverage}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">Vin</td>
                              <td className="table_description">{row.Vin}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">StatedAmt</td>
                              <td className="table_description tabltd">
                                {row.vehicleWorth}</td>
                            </tr>
                            <tr >
                              <td className="table_heading_secction">Action</td>
                              <td className="table_description tabltd">
                              <button className="btn" onClick={() => handleEdit(row)}>
  <i className="fa-regular fa-pen-to-square"></i>
</button>
<button className="btn" onClick={() => handleDelete(row._id)}>
<i class="fa-solid fa-trash-can"></i>
</button>
                               </td>
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
                {vehicletable.length > 0 ? " Add another Vehicle" : " Add a Vehicle"}
              </button>
            </div>

            <div className="btn_position">
              <button className="back_button" onClick={() => handleNavigationClick("start")}>
                {' '}
                Back &nbsp;&nbsp;
              </button>
              <button className="small-screen" onClick={() => handleNavigationClick("start")}>
                {' '}
                <i class="fa-solid fa-angle-left"></i>
              </button>
              <button className="continous_button" onClick={gotonext}>
              Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        ) : (
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

              <input
  className="mx-2 inputfield"
  type="radio"
  id="age2"
  name="age1"
  onChange={handleRadio}
  defaultValue={"VIN"}
  defaultChecked  // Add this attribute
/>

                <label className="loanlbl" htmlFor="age2">VIN</label>

              </div>
            </div>

            <div className="textcon mt-5">
              Vehicle Identification Number(VIN)
            </div>
            <div className="row mt-2 lookupvin">
              <div className="col-md-4 vintxt">
                <input className="text_input px-2" value={Vin} onChange={(e) => { setVin(e.target.value) }} type="text" />
              </div>
              <div className="col-md-3">
                <button className="btn_vin" style={{border:"none"}} onClick={lookupvinnumber}>
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
              <div className="col-md-5 inputfieldrow">
                Zip Code where the vehicle is located?
              </div>
              <div className="col-md-4">
                <input className="text_input px-3" value={zipCode} onChange={(e) => { setZipCode(e.target.value) }} placeholder="20744" type="text" />
              </div>
            </div>
            <div className="row mt-5 ">
              <div className="col-md-4 inputfieldrow">
                Farthest one-way distance this vehicle typically travels(90% or more of the <br></br> time)
              </div>
              <div className="col-md-4">
                <input className="text_input px-3" value={distance} onChange={(e) => { setDistance(e.target.value) }} type="text" />
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-4 inputfieldrow">
              Do you need comprehensive or collision coverage to protect this vehicle in an accident or loss?
              </div>
              <div className="col-md-7 vehicle_typeans ">

                <input className="inputfield" type="radio" id="age1" name="age4" onChange={handleCoverage} defaultValue={"Yes"} />
                <label className="loanlbl" htmlFor="age1">Yes</label>

                <input className="mx-2 inputfield" type="radio" id="age2" name="age4" onChange={handleCoverage} defaultValue={"Yes"} />
                <label className="loanlbl" htmlFor="age2">No</label>

              </div>
            </div>



            <div className="heading_vehicle_add mt-5">
              Unit Value
            </div>

            <div className="row mt-5 align-items-center">
              <div className="col-md-4 inputfieldrow">
                If this vehicle was sold today,how much would it be worth?
              </div>
              <div className="col-md-4">
              <input
      className="text_input px-3"
      value={vehicleWorth}
      placeholder="$45,000"
      type="text"
      onChange={handleInputChange}
    />             </div>
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
              Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        )
      }

      <Modals isOpen={isModalOpen} onClose={closeModal}>
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

          <button className="closebtn" onClick={closeModal}>Cancel</button>
          <button className="confirmbtn mx-3" onClick={handleConfirm}>Confirm</button>
        </div>


      </Modals>
      <Modal
        title="Confirm Deletion"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>Are you sure you want to delete this vehicle?</p>
      </Modal>
      <AntModal
  title="Vin"
  open={isNewModalVisible}
  onOk={doneNewModal}
  onCancel={closeNewModal}
  width={650}
  okText="Done"
  okButtonProps={{ style: { background: '#2a4764', color: 'white' } }}
>

 {
  loading ? (<>
  <Skeleton active />
  </>):(
    <div className="modal-contents">
      <div className="mainheading">
        {vinresponse[10]?.Value} {vinresponse[9]?.Value} {vinresponse[7]?.Value}
      </div>
      <div className="cont mt-4 "style={{ display: 'flex', gap: '10px',flexWrap:"wrap" }} >
           <div className="infoblock">
        <div className="title">
          Vin
        </div>
        <div className="value">
          {Vin}
        </div>
      </div>
       
           <div className="infoblock">
        <div className="title">
          Make
        </div>
        <div className="value">
          {vinresponse[7]?.Value}
        </div>
      </div>
           <div className="infoblock">
        <div className="title">
          Model
        </div>
        <div className="value">
        {vinresponse[9]?.Value}
        </div>
      </div>
      <div className="infoblock">
        <div className="title">
          Year
        </div>
        <div className="value">
        {vinresponse[10]?.Value}
        </div>
      </div><div className="infoblock">
        <div className="title">
          Driver Type
        </div>
        <div className="value">
        {vinresponse[51]?.Value}
        </div>
      </div><div className="infoblock">
        <div className="title">
        Manufactured in        </div>
        <div className="value">
        {vinresponse[8]?.Value}
        </div>
      </div>
      </div>
     

</div>
  )
 }

</AntModal>
    </>
  );
}

export default VehiclesPage;
