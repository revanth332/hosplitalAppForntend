import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Route, Navigate } from 'react-router-dom';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function Temp() {
    const [isAuthenticate, setIsAuthenticate] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem("token");
        axios.get(`${SERVER_URL}/authorize/protected`, {
            headers : {
              Authorization : token,
            }
          }).then(() => {
            setIsAuthenticate(true);
          }).catch((e) => console.log("error : "+e))
    
    },[])
  return (
    <>
    {isAuthenticate ? <div> hello {isAuthenticate ? "yes" : "No"}</div> : <Navigate to="/" /> }
    </>
  )
}
