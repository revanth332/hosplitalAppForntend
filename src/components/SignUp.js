import React, { useState,useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import Navbar from './Navbar';
import axios from 'axios';
import './sign.css';
import doc from '../doc.png';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [isAuthenticate, setIsAuthenticate] = useState({isValid : false,isAdmin : false});
  useEffect(() => {
    let token = localStorage.getItem("token");
        axios.get(`${SERVER_URL}/authorize/protected`, {
            headers : {
              Authorization : token,
            }
          }).then(() => {
            setIsAuthenticate({...isAuthenticate,isValid:true});
          }).catch((e) => console.log("error : "+e))
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match.'); // Display an error toast message
        return; // Exit the function without further processing
      }
    try {
      // Make a POST request to your backend route for sign-up
      const response = await axios.post(`${SERVER_URL}/authenticate/signup`, formData);
  
      if (response.data.success) {
        // Sign-up was successful
  
        // Clear the form fields
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
        });
        toast.success("Signup successul!")
        // navigate('/table'); // Redirect to the desired page (PatientTable in this case)
      } else {
        // Sign-up failed
        toast.error('Sign-up failed. Please try again.'); // Display an error toast message
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while signing up.'); // Display an error toast message
    }
  };
  

  return (
    <>
    <Navbar isAuthenticate={isAuthenticate}/>
    {isAuthenticate.isValid ?  <Navigate to="patienttable" /> : <Container className="vh-100 con">
    <div className='docbox'>
      <img src={doc} className='doc' alt="My Image" />
    </div>
      <Form style={customFormStyle} onSubmit={handleSubmit}>
      <div style={customHeaderStyle}>
  <h2>SignUp</h2>
</div>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </Container> }
    </>
  );
}

const customFormStyle = {
  border: '1px solid #ccc',
  padding: '40px 20px',
  width:'450px',
  borderRadius:'10px'
};
const customHeaderStyle = {
  background: 'linear-gradient(to bottom, #3498db, #2980b9)',
  textAlign: 'center',
  padding: '5px',
  color: '#fff',
  borderRadius:'10px',
  marginBottom:'20px'
};
    
export default SignUp;
