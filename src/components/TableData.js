import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './TableData.css';
import PatientForm from './PatientForm';
import {ToastContainer, toast } from 'react-toastify';
import { FiTrash,FiEdit } from 'react-icons/fi';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function TableData() {
  const [patients, setPatients] = useState([]);
  const [isUpdating,setIsUpdating] = useState(false);
  const [patient,setPatient] = useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState({isValid : false,isAdmin : false});
  const navigate = useNavigate();
  
    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get(`${SERVER_URL}/authorize/protected`, {
            headers : {
              Authorization : token,
            }
          }).then((res) => {
            setIsAuthenticate({isValid : true,isAdmin : res.data.user.role=="admin"});
            axios.get(`${SERVER_URL}/api/patients/all`)
            .then((response) => {
              // Update the 'patients' state with the fetched data
              setPatients(response.data);
            })
            .catch((error) => {
              console.error('Error fetching patient data:', error);
            });
          }).catch((e) =>{
            navigate("/")
          })
    
    },[])

  const handleUpdateClick = (patient) => {
    // Implement the update functionality here
    console.log(`Update clicked for patient ID: ${patient}`);
    delete patient.__v;
    setPatient(patient);
    setIsUpdating(true);
    // console.log(patient)
  };

  const handleDeleteClick = async (patientId) => {
    // Implement the delete functionality here
    try{
      const response = await axios.post(`${SERVER_URL}/api/patients/delete`,{patientId});
      if(response.status === 200){
        toast.success("Patient deleted successfully!");
        setPatients(patients.filter((p) => p._id != patientId))
      }
      else{
        toast.error("Failed to delete patient");
      }
    }catch(e){
      toast.error("Something went wrong")
    }
  };

  return (
    <>
    {isUpdating ? <PatientForm  patients={patient}/> : <>
    <Navbar isAuthenticate={isAuthenticate}/>
    <h2 className='mt-3'>Patient Data : </h2>
    <div className="t-box mt-3 vw-100 overflow-scroll">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Alternate Number</th>
          <th>City</th>
          <th>State</th>
          <th>DOB</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Martial Status</th>
          <th>Employment</th>
          <th>Employment Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient,indx) => (
          <tr key={patient.id}>
            {Object.keys(patient).map((field) => field === "__v" ? null : (
              <td key={field+""+indx}>{patient[field]}</td>
            ))}
            <td >
              <div className='d-flex justify-content-between align-items-center'>
                <FiEdit color='#7373e2' fontSize={20} className='d-block bt' onClick={() => handleUpdateClick(patient)}/>
              
                <FiTrash color='#ee7171' fontSize={20} className='d-block bt' onClick={() => handleDeleteClick(patient._id)}/>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <ToastContainer />
    </div>
    </>}
    
    </>
  );
}

export default TableData;
