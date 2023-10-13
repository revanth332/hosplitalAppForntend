import React, { useState ,useContext,useEffect} from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from './Navbar';
import doc from '../doc.png'
import './sign.css'
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isAuthenticate, setIsAuthenticate] = useState({isValid : false,isAdmin : false});
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("token");
        axios.get(`${SERVER_URL}/authorize/protected`, {
            headers : {
              Authorization : token,
            }
          }).then(() => {
            navigate("/patienttable")
          }).catch((e) => {
            console.log(e);
          })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        // Send a POST request to your backend route for sign-in
        const response = await axios.post(`${SERVER_URL}/authenticate/signin`, formData);
  
        if (response.data.success) {
          localStorage.setItem('token',response.data.token);
          navigate('/patienttable');
          
        } else {
          // Sign-in failed
          toast.error("SignIn Failed")
          console.error('Sign-in failed');
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
        toast.error('Error : '+error);
      }
  };

  return (
    <>
    <Navbar isAuthenticate={isAuthenticate}/>

    <Container className="vh-100 con">
    <div className='docbox'>
      <img src={doc} className='doc' alt="My Image" />
    </div>
      <Form style={customFormStyle} className='fm' onSubmit={handleSubmit}>
      <div style={customHeaderStyle}>
            <h2>SignIn</h2>
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

        <Button variant="primary" type="submit" className='mt-3'>
          Submit
        </Button>
      </Form>
      <ToastContainer />
    </Container>
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

export default SignIn;
