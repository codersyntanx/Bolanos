import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './detail.css'; // Import a CSS file for styling

const DetailPage = () => {
  const { id } = useParams(); // Get the id from the URL parameters
  const [detailData, setDetailData] = useState({});
  const [vehicledata, setVehicledata] = useState([]);
  const [driverdata, setDriverdata] = useState([]);
  const [business, setBusiness] = useState([]);


  useEffect(() => {
    fetchData();
    fetchdriver()
  }, [id]);
  const fetchdriver =()=>{
    if (id) {
      axios.get(`http://localhost:3003/getdriverbyinforid/${id}`)
        .then(res => {
          if (res.data.status === true) {
            setDriverdata(res.data.data);
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle data:', error);
          // Handle the error, e.g., display an error message to the user
        });
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3003/getinformationbyid/${id}`);
      setDetailData(response.data.data);
    } catch (error) {
      console.error('Error fetching detail data:', error);
    }
  };
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3003/getvehicalbyinforid/${id}`)
        .then(res => {
          if (res.data.status === true) {
            setVehicledata(res.data.data);
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle data:', error);
        });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3003/getbussinessbyinfo/${id}`)
        .then(res => {
          if (res.data.status === true) {
            setBusiness(res.data.data);
          }
        })
        .catch(error => {
          console.error('Error fetching vehicle data:', error);
        });
    }
  }, [id]);
  console.log(business)
  return (
    <>
    <div className='container'>
      <h1>Start</h1>
      <div className='container' style={{backgroundColor:"white",borderRadius:"20px"}}>

         <div className='row' >
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Business Type:</strong>
        </div>
        <div>{detailData?.bussinesstype}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Full Name:</strong>
        </div>
        <div>{detailData?.fullname}</div>
      </div>
        </div>
      </div>
     

      <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Do you have a USDOT#? :</strong>
        </div>
        <div>{detailData?.selectedOption}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Middle Name:</strong>
        </div>
        <div>{detailData?.middlename}</div>
      </div>
        </div>
      </div> 
       <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Last Name:</strong>
        </div>
        <div>{detailData?.lastname}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Suffix:</strong>
        </div>
        <div>{detailData?.suffix}</div>
      </div>
        </div>
      </div>  <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Address:</strong>
        </div>
        <div>{detailData?.address}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Zip:</strong>
        </div>
        <div>{detailData?.zip}</div>
      </div>
        </div>
      </div>  <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>City:</strong>
        </div>
        <div>{detailData?.city}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Date of Birth:</strong>
        </div>
        <div>{detailData?.dateofBirth}</div>
      </div>
        </div>
      </div>  <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Phone Number:</strong>
        </div>
        <div>{detailData?.phonenumber}</div>
      </div>
        </div>

      </div>
      </div>
     

    </div>
    <div className='container ' style={{borderRadius:"10px"}}>
    <h1>Vehicle</h1>

        {
            vehicledata.map((vehicle)=>{
                return(
                     < div className='container mt-3' style={{backgroundColor:"white",borderRadius:"10px"}}>
                 <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>selectedTruck :</strong>
                </div>
                <div>{vehicle.selectedTruck}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Zip:</strong>
                </div>
                <div>{vehicle.zipCode}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>distance :</strong>
                </div>
                <div>{vehicle.distance}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Coll:</strong>
                </div>
                <div>{vehicle.needCoverage}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>vehicleWorth :</strong>
                </div>
                <div>{vehicle.vehicleWorth}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Vehical by:</strong>
                </div>
                <div>{vehicle.vehicalby}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Vin :</strong>
                </div>
                <div>{vehicle.Vin}</div>
              </div>
                </div>

              </div> 
                </div>
               
                )
               
              
            })
        }
    </div>


    <div className='container ' style={{borderRadius:"10px"}}>
    <h1>Driver</h1>

        {
            driverdata.map((vehicle)=>{
                return(
                     < div className='container mt-3' style={{backgroundColor:"white",borderRadius:"10px"}}>
                 <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>First Name :</strong>
                </div>
                <div>{vehicle.fullName}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Middle Name:</strong>
                </div>
                <div>{vehicle.middleInitial}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Last Name :</strong>
                </div>
                <div>{vehicle.lastName}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Date Of birth:</strong>
                </div>
                <div>{vehicle.dob}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Lisence State :</strong>
                </div>
                <div>{vehicle.licenseState}</div>
              </div>
                </div>
                <div className='col-md-6'>
                      <div className='detail-item'>
                <div>
                  <strong>Lisence Number:</strong>
                </div>
                <div>{vehicle.licenseNumber}</div>
              </div>
                </div>
              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>CDL :</strong>
                </div>
                <div>{vehicle.selectedValue}</div>
              </div>
                </div>

              </div> 
              <div className='row'>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Years :</strong>
                </div>
                <div>{vehicle.expyear}</div>
              </div>
                </div>
                <div className='col-md-6'>
                     <div className='detail-item'>
                <div>
                  <strong>Months :</strong>
                </div>
                <div>{vehicle.expmonth}</div>
              </div>
                </div>

              </div>
                </div>
               
                )
               
              
            })
        }





    </div>

    <div className='container'>
      <h1>About Bussiness</h1>
      <div className='container' style={{backgroundColor:"white",borderRadius:"20px"}}>

         <div className='row' >
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Business Email Address:</strong>
        </div>
        <div>{business[0]?.customerEmail}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Is the Business Currently insured?</strong>
        </div>
        <div>{business[0]?.currentlyInsured}</div>
      </div>
        </div>
      </div>
     

      <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Have you had continuous coverage?</strong>
        </div>
        <div>
            
            
            {business[0]?.continuousCoverage}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Currently Bodily injury Liability Limit</strong>
        </div>
        <div>{business[0]?.bodilyInjuryLimit}</div>
      </div>
        </div>
      </div> 
       <div className='row'>
        <div className='col-md-6'>
             <div className='detail-item'>
        <div>
          <strong>Current Policy Expiration Date:</strong>
        </div>
        <div>{business[0]?.policyExpirationDate}</div>
      </div>
        </div>
        <div className='col-md-6'>
              <div className='detail-item'>
        <div>
          <strong>Do you have an MC# or do you plan cross state lines?</strong>
        </div>
        <div>{business[0]?.hasMCNumber}</div>
      </div>
        </div>
      </div>  
   
      </div>
     

    </div>
    </>
    
  );
};

export default DetailPage;
