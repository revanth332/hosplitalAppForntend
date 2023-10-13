import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'


export default function SignOut() {
  useEffect(() => {
    localStorage.removeItem("token");
  })
  return (
    <Navigate to="/" />
  )
}
