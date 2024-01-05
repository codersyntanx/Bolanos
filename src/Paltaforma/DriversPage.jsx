import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { notification,Modal } from 'antd';
import Radio from '@mui/material/Radio';
import "./Driver.css"
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';
import Select from 'react-select';
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas",
  "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const stateOptions = states.map(state => ({ value: state, label: state }));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: '9px',
    height: '51px',
    border: state.isFocused ? '1px solid rgba(0, 0, 0, 0.42)' : '1px solid rgba(0, 0, 0, 0.42)',
    boxShadow: state.isFocused ? '1px solid rgba(0, 0, 0, 0.42)' : 'none',
    color:"black",
    fontWeight:"450"
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'black', // Set arrow color
    borderRight: 'none', // Remove the border to the right of the arrow
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2a4764' : 'white', // Set background color for selected option
    color: state.isSelected ? 'white' : 'black', // Set text color for selected option
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black', // Set text color for the selected value
  }),
};
const StyledRadio = styled(Radio)({
  color: '#30577E',
  width: '30px',
  height: '30px',
  '&.Mui-checked': {
    color: '#30577E',
    width: '30px',
    height: '30px',
  },
});
function DriversPage({ changeIcon, handleNavigationClick }) {
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [fullName, setFullName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [licenseState, setLicenseState] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicletable, setVehicletable] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  const [expyear, setExpyear]=useState("")
  const [expmonth, setExpmonth]=useState("")
  const [informId, setInformId] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

const adddriver =()=>{
  setIsSectionVisible(!isSectionVisible);
}
useEffect(() => {
  const informationId = localStorage.getItem("mainid");
  if (informationId) {
    setInformId(informationId);
  }
}, []);

useEffect(() => {
  fetchdriver()
}, [informId]);
const fetchdriver =()=>{
  if (informId) {
    axios.get(`https://serverforbce.vercel.app/api/getdriverbyinforid/${informId}`)
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
const handleDelete = async (id) => {
  setDeleteId(id);
  setModalVisible(true);
};
// const handleButtonClick = () => {
//   if (
//     fullName &&
//     middleInitial &&
//     lastName &&
//     dob &&
//     licenseState &&
//     licenseNumber &&
//     selectedValue
//   ) {

//     const newDriverData = {
//       fullName,
//       middleInitial,
//       lastName,
//       dob,
//       licenseState,
//       licenseNumber,
//       selectedValue,
//       expyear,
//       expmonth,
//       informId
//     };

//     axios.post("https://serverforbce.vercel.app/api/postdriver", newDriverData)
//       .then(res => {
//         if (res.data.status === true) {
//           changeIcon('fa-regular fa-circle-check green-icon');
//           adddriver();
//           fetchdriver()
//           // Display success notification
//           openNotification('success', 'Driver Created Successfully');
//         } else {
//           // Display error notification
//           openNotification('error', 'Error Creating Driver', res.data.error);
//         }
//       })
//       .catch(error => {
//         console.error('Error creating driver:', error);

//         // Display error notification
//         openNotification('error', 'Error Creating Driver', 'An unexpected error occurred.');
//       });

//   } else {
//     alert('Please fill in all required fields.');
//   }
// };
const handleModalOk = async () => {
  try {
    const response = await axios.delete(`https://serverforbce.vercel.app/api/deletedriverbyid/${deleteId}`);

    if (response.data.status === true) {
      // Remove the deleted driver from the table
      setVehicletable((prevTable) => prevTable.filter((row) => row._id !== deleteId));
      openNotification('success', 'Driver Removed Successfully');
    } else {
      console.error('Error deleting driver:', response.data.error);
      openNotification('success', 'Driver Removed Successfully');
    }
  } catch (error) {
    console.error('Error deleting driver:', error);
    openNotification('error', 'A unexpected Error Occur');
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
const handleModalCancel = () => {
  setModalVisible(false);
  setDeleteId(null);
};
// const gotonext =()=>{
//   changeIcon('fa-regular fa-circle-check green-icon');
//   handleNavigationClick('about');
// }

const gotonext =()=>{
  if(vehicletable.length > 0){
    changeIcon('fa-regular fa-circle-check green-icon');
  handleNavigationClick('about');
  }else{
    openNotification('error', 'Please add atleast one Driver');

  }
  
}
  // Update Driver
  const handleUpdate = (driverId) => {
    const driverToUpdate = vehicletable.find((driver) => driver._id === driverId);

    if (driverToUpdate) {
      // Set state with the values of the driver to update
      setFullName(driverToUpdate.fullName);
      setMiddleInitial(driverToUpdate.middleInitial);
      setLastName(driverToUpdate.lastName);
      setDob(driverToUpdate.dob);
      setLicenseState(driverToUpdate.licenseState);
      setLicenseNumber(driverToUpdate.licenseNumber);
      setSelectedValue(driverToUpdate.selectedValue);
      setExpyear(driverToUpdate.expyear);
      setExpmonth(driverToUpdate.expmonth);
      setInformId(driverToUpdate.informId);
    // Show the form section
    setIsSectionVisible(false);
      // Set the driver ID to be updated
      setDeleteId(driverId);

  
    }
  };

  // ... (previous useEffect and functions)

  const handleButtonClick = (e) => {
    const form = e.target.form;

    // Manually check form validity
    if (!form.checkValidity()) {
      // If form is invalid, show an error message or handle it accordingly
      openNotification("error", "Please fill in all required fields.");
      return;
    }
  
    e.preventDefault();
   
    if (
      fullName &&
      lastName &&
      dob &&
      licenseState &&
      licenseNumber &&
      selectedValue
    ) {
      const newDriverData = {
        fullName,
        middleInitial,
        lastName,
        dob,
        licenseState,
        licenseNumber,
        selectedValue,
        expyear,
        expmonth,
        informId,
      };

      // Check if it's an update or a new post
      const url = deleteId
        ? `https://serverforbce.vercel.app/api/putdriver/${deleteId}`
        : "https://serverforbce.vercel.app/api/postdriver";

      const axiosMethod = deleteId ? axios.put : axios.post;

      axiosMethod(url, newDriverData)
        .then((res) => {
          if (res.data.status === true) {
            // If it's an update, reset the state and deleteId
            if (deleteId) {
              setDeleteId(null);
            }

            // Reset form and fetch updated driver data
            setFullName("");
            setMiddleInitial("");
            setLastName("");
            setDob("");
            setLicenseState("");
            setLicenseNumber("");
            setSelectedValue("");
            setExpyear("");
            setExpmonth("");
            setInformId("");

            fetchdriver();
            setIsSectionVisible(true);

            // Display success notification
            openNotification("success", deleteId ? "Driver Updated Successfully" : "Driver Created Successfully");
          } else {
            // Display error notification
            openNotification("error", deleteId ? "Error Updating Driver" : "Error Creating Driver", res.data.error);
          }
        })
        .catch((error) => {
          console.error(deleteId ? "Error updating driver:" : "Error creating driver:", error);

          // Display error notification
          openNotification("error", deleteId ? "Error Updating Driver" : "Error Creating Driver", "An unexpected error occurred.");
        });
    } else {
      openNotification("error","  Please Fill all the blanks" );
    }
  };
  const handleProtect = (selectedOption) => {
    setLicenseState(selectedOption.value);
    
  };
  console.log(licenseState)
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
                Please add all driver’s who will drive any previously listed vehicles<br />
(Full Name, Date of Birth, License State, License Number, CDL/Non-CDL)
              </p>
              {vehicletable.length > 0 && (
        <table className='main_table mt-5 mb-5'>
          <thead className='table_header'>
            <tr>
              <th className='idtr'>Driver Name</th>
              <th>License Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicletable.map((row, index) => (
              <tr key={index}>
                <td className="tabltd">{row.fullName}</td>
                <td>{row.licenseNumber}</td>
                <td>
                  <button className='btn' onClick={() => handleUpdate(row._id)}>
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button className='btn' onClick={() => handleDelete(row._id)}>
                    <i className="fa-solid fa-user-xmark"></i>
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
                            <tr className="border-bottom">
                              <td className="table_heading_secction">Driver Name</td>
                              <td className="table_description">{row.fullName}</td>

                            </tr>
                            <tr >
                              <td className="table_heading_secction">License Number</td>
                              <td className="table_description tabltd">
                                {row.licenseNumber}</td>
                            </tr> 
                            <tr>
                            <td className="table_heading_secction ">Action</td>
                               <td className='deletebtn'>
                  <button className='btn tabltd' onClick={() => handleDelete(row._id)}><i class="fa-solid fa-user-xmark"></i></button>
                </td>
                              </tr>  
                          </table>
                        </>
                      )
                    })
                  }
                </div>
              )}

              <button className="Driver_button justify-content-center mt-3" onClick={adddriver}>
                <svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" className="plus_svg" viewBox="0 0 24 24">
                  <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
                </svg>{' '}
                {vehicletable.length > 0 ? " Add another Driver" : " Add a Driver"}
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
            <button className="continous_button" onClick={gotonext}>
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
        {!isSectionVisible && (
          <div className="after_press">
            <p className="question">A few  more questions about  Driver #{vehicletable.length + 1}</p>
            <form onSubmit={handleButtonClick}>
            <div className="row newdriver">
             
              <label className="col-sm-3 lableforinput" htmlFor="fullName">
                Name:
              </label>
              <div className='namepart col-sm-8'>
              <div className="fnam">
                <input type="text" className="form-control" id="fullName" placeholder="First Name" value={fullName} onChange={(e)=>{setFullName(e.target.value)}} required/>
              </div>
              <div className="nmi">
                <input type="text" className="form-control" id="middleInitial" placeholder="MI" value={middleInitial} onChange={(e)=>{setMiddleInitial(e.target.value)}}/>
              </div>
              <div className="lnam">
                <input type="text" className="form-control" id="lastName" placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required/>
              </div>
              </div>
             
              </div>
            <div className="row align-items-center">
            <div class="row newdriver align-items-end">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">Date of Birth:</label>
  <div class="col-sm-8">
    <input type="date" class="form-control"
     style={{
      color: dob !== '' ? 'black' : 'grey',
    }}
    value={dob} onChange={(e)=>{setDob(e.target.value)}}   
     required/>
  </div>

</div>
<div class="row newdriver align-items-center">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">Driver’s License State:</label>
  <div class="col-sm-8">
  <Select
      options={stateOptions}
      styles={customStyles}
      onChange={handleProtect}
      required
    />
  </div>

</div>
<div class="row newdriver align-items-center">
  <label for="colFormLabelLg" class="col-sm-3 lableforinput">License Number:</label>
  <div class="col-sm-8">
 
    <input type="text" class="form-control " value={licenseNumber} onChange={(e)=>{setLicenseNumber(e.target.value)}}  placeholder="FRB34JU80005" required/>
  </div>

</div>
<div className="row newdriver">
              <div className="col-md-3 lableforinput">
              CDL:    
              </div>
              <div className="col-md-7 vehicle_typeans">
   
      <StyledRadio
   checked={selectedValue === 'Yes'}
  onChange={() => handleRadioChange('Yes')}
  value="Yes"
  name="radio-buttons"
  className="inputfield "
  required
/>
<label className="loanlbl" htmlFor="age1">Yes</label>

<StyledRadio
   checked={selectedValue === 'No'}
  onChange={() => handleRadioChange('No')}
  value="No"
  name="radio-buttons"
  className="inputfield mx-2"
/>
<label className="loanlbl" htmlFor="age2">No</label>
    </div>
            </div>
{
  selectedValue === "Yes" ?(
    <> 
     <div className="row align-items-center newdriver">
      <label htmlFor="colFormLabelLg" className="col-sm-3 lableforinput">CDL Experience:</label>
      <div className="col-sm-2 cdlexp">
        <input type="text" className="form-control" value={expyear} onChange={(e) => { setExpyear(e.target.value) }} placeholder="Year" />
      </div>
      <div className="col-sm-2">
        <input type="text" className="form-control" value={expmonth} onChange={(e) => { setExpmonth(e.target.value) }} placeholder="Month" />
      </div>
    </div>  
    </>
  ):(
    <>
    
    </>
  )
}
 
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
            Continue &nbsp;&nbsp;<i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          </form> </div>
          
        )}
      </div>
      <Modal
        title="Confirm Deletion"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okButtonProps={{ style: { background: '#2a4764', color: 'white' } }}

      >
        <p>Are you sure you want to remove this driver?</p>
      </Modal>
    </>
  );
}

export default DriversPage;
