import React, { useState,useEffect } from 'react';
import { div , Row, Col, Form, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import { Navigate,useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { ToastContainer,toast } from 'react-toastify';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function PatientForm({patients=null}) {
  const [isAuthenticate, setIsAuthenticate] = useState({isValid : false,isAdmin : false});
  const [updateForm,setUpdateForm] = useState(patients === null ? false : true);
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(patients === null ? {
    name: '',
    phoneNumber: '',
    altPhoneNumber: '',
    city: '',
    state: '',
    dob: '',
    age: '',
    gender: '',
    maritalStatus: '',
    employment: '',
    employmentStatus: '',
  } : patients);

  useEffect(() => {
    let token = localStorage.getItem("token");
        axios.get(`${SERVER_URL}/authorize/protected`, {
            headers : {
              Authorization : token,
            }
          }).then((res) => {
            if(!res.data.user.role === "admin"){
              navigate("/patienttable")
            }
            setIsAuthenticate({isValid : true,isAdmin : res.data.user.role=="admin"});
          }).catch((e) => {
            navigate("/")
          })
  }, []);

  const regexp = /^[6-9]\d{9}$/;

  const handleAddPatient = async (e) => {
    e.preventDefault();
    if(!regexp.test(patientData.phoneNumber) || !regexp.test(patientData.altPhoneNumber)){
      toast.error('Please enter valid phone number');
      return;
    }
    try {
      // Send a POST request to the backend to add patient details
      const response = await axios.post(`${SERVER_URL}/api/patients/add`, patientData);
  console.log()
      // Check if the request was successful
      if (response.status === 200) {
        // Handle success, e.g., show a success message
        toast.success("Patient added successfully!")
        setPatientData({
          name: '',
          phoneNumber: '',
          altPhoneNumber: '',
          city: '',
          state: '',
          dob: '',
          age: '',
          gender: '',
          maritalStatus: '',
          employment: '',
          employmentStatus: '',
        })
      } else {
        // Handle any other response status codes or errors
        toast.error("Failed to add patient!")
      }
    } catch (error) {
      // Handle any network or request errors
      toast.error("Something went wrong!")
    }
  };

  const updatePatient = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(`${SERVER_URL}/api/patients/update`, patientData);
  
      // Check if the request was successful
      if (response.status === 200) {
        // Handle success, e.g., show a success message
        navigate("/temp")
      } else {
        // Handle any other response status codes or errors
        toast.error("Failed to update patient!")
      }
    } catch (error) {
      // Handle any network or request errors
      toast.error("Something went wrong!")
    }
  }

  return (
    <>
    <Navbar isAuthenticate={isAuthenticate}/>
  <div className="d-flex justify-content-center align-items-center">
    <div className='container'>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center mb-4 mt-4">
            <h2>Enter Patient Details</h2>
          </div>
          <Form>
            <FormGroup as={Row} className="mb-4">
              <Form.Label column md={3}>
                Name
              </Form.Label>
              <Col md={9}>
                <Form.Control
                  type="text"
                  placeholder="Enter patient's name"
                  value={patientData.name}
                  onChange={(e) =>
                    setPatientData({ ...patientData, name: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-4">
              <Form.Label column md={3}>
                Phone Number
              </Form.Label>
              <Col md={3}>
                <Form.Control
                  type="tel"
                  placeholder="Phone Number"
                  value={patientData.phoneNumber}
                  onChange={(e) =>
                    setPatientData({ ...patientData, phoneNumber: e.target.value })
                  }
                />
              </Col>
              <Form.Label column md={3}>
                Alternate Phone Number
              </Form.Label>
              <Col md={3}>
                <Form.Control
                  type="tel"
                  placeholder="Alternate Phone Number"
                  value={patientData.altPhoneNumber}
                  onChange={(e) =>
                    setPatientData({ ...patientData, altPhoneNumber: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-4">
              <Form.Label column md={3}>
                City
              </Form.Label>
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="City"
                  value={patientData.city}
                  onChange={(e) =>
                    setPatientData({ ...patientData, city: e.target.value })
                  }
                />
              </Col>
              <Form.Label column md={3}>
                State
              </Form.Label>
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="State"
                  value={patientData.state}
                  onChange={(e) =>
                    setPatientData({ ...patientData, state: e.target.value })
                  }
                />
              </Col>
            </FormGroup>

            <FormGroup as={Row} className="mb-4">
              <Form.Label column md={3}>
                Date of Birth
              </Form.Label>
              <Col md={3}>
                <Form.Control
                  type="date"
                  placeholder="Date of Birth"
                  value={patientData.dob}
                  onChange={(e) =>
                    setPatientData({ ...patientData, dob: e.target.value })
                  }
                />
              </Col>
              <Form.Label column md={3}>
                Age
              </Form.Label>
              <Col md={3}>
                <Form.Control
                  type="number"
                  placeholder="Age"
                  value={patientData.age}
                  onChange={(e) =>
                    setPatientData({ ...patientData, age: e.target.value })
                  }
                />
              </Col>
            </FormGroup>
            
            <Form.Group as={Row} className="mb-4">
            <Form.Label column md={3}>
                Gender
              </Form.Label>
              <Col md={3} className='d-flex justify-content-between align-items-center'>
                <Form.Check
                  type="radio"
                  label="Male"
                  value="male"
                  name="gender"
                  id="male"
                  checked={patientData.gender === "male"}
                  onChange={(e) =>
                    setPatientData({ ...patientData, gender: e.target.value })
                  }
                  
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  value="female"
                  name="gender"
                  id="female"
                  checked={patientData.gender === "female"}
                  onChange={(e) =>
                    setPatientData({ ...patientData, gender: e.target.value })
                  }
                  
                />
              </Col>
  <Form.Label column md={3}>
    Patient's Employment
  </Form.Label>
  <Col md={3}>
    <Form.Control
      type="text"
      placeholder="Employment"
      value={patientData.employment}
      onChange={(e) =>
        setPatientData({ ...patientData, employment: e.target.value })
      }
    />
  </Col>
</Form.Group>
<Form.Group as={Row} className="mb-4">
<Form.Label column md={3}>
    Employment Status
  </Form.Label>
  <Col md={9} className='d-flex justify-content-between align-items-center'>
      <Form.Check
        type="radio"
        label="Full time"
        value="Full time"
        name="employmentStatus"
        id="full-time"
        checked={patientData.employmentStatus === "Full time"}
        onChange={(e) =>
          setPatientData({ ...patientData, employmentStatus: e.target.value })
        }
      />
      <Form.Check
        type="radio"
        label="Part time"
        value="Part time"
        name="employmentStatus"
        id="part-time"
        checked={patientData.employmentStatus === "Part time"}
        onChange={(e) =>
          setPatientData({ ...patientData, employmentStatus: e.target.value })
        }
      />
      <Form.Check
        type="radio"
        label="Unemployed"
        value="Unemployed"
        name="employmentStatus"
        id="unemployed"
        checked={patientData.employmentStatus === "Unemployed"}
        onChange={(e) =>
          setPatientData({ ...patientData, employmentStatus: e.target.value })
        }
      />
      
      <Form.Check
        type="radio"
        label="Retired"
        value="Retired"
        name="employmentStatus"
        id="retired"
        checked={patientData.employmentStatus === "Retired"}
        onChange={(e) =>
          setPatientData({ ...patientData, employmentStatus: e.target.value })
        }
      />
      <Form.Check
        type="radio"
        label="Student"
        value="Student"
        name="employmentStatus"
        id="student"
        checked={patientData.employmentStatus === "Student"}
        onChange={(e) =>
          setPatientData({ ...patientData, employmentStatus: e.target.value })
        }
      />
  </Col>
</Form.Group>
<ToastContainer />
{
  !updateForm ? <Button
  variant="primary"
  type="button"
  onClick={handleAddPatient}
  className="w-100"
>
  Add Patient
</Button> : <Button
              variant="primary"
              type="button"
              onClick={updatePatient}
              className="w-100"
            >
              Update Patient
            </Button>
}
            
          </Form>
        </Col>
      </Row>
    </div >
    </div>
    </>
  );
}
{/* <Navigate to="/patienttable" /> */}
export default PatientForm;
