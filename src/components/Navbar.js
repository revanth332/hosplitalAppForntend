import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({isAuthenticate}) {
  return (
    <div className='container-fluid d-flex justify-content-end shadow p-2'>
        <ul className='nav'>
            {isAuthenticate.isValid ? null : <li className='nav-item'>
                <Link to="/" className='nav-link'>signin</Link>
            </li>}
            {isAuthenticate.isValid ? null : <li className='nav-item'>
                <Link to="/signup" className='nav-link'>signup</Link>
            </li>}
            {isAuthenticate.isValid &&  isAuthenticate.isAdmin ? <li className='nav-item'>
                <Link to="/patienttable" className='nav-link'>Patient Details</Link>
            </li> : null}
            {isAuthenticate.isValid &&  isAuthenticate.isAdmin ? <li className='nav-item'>
                <Link to="/patientform" className='nav-link'>Patient Form</Link>
            </li> : null}
            {isAuthenticate.isValid ? <li className='nav-item'>
                <Link to="/signout" className='nav-link'>Log out</Link>
            </li> : null}
        </ul>
    </div>
  )
}
