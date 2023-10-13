import React, { createContext,useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PatientTable from './components/TableData'
import PatientForm from './components/PatientForm';
import Temp from './components/Temp';
import SignOut from './components/SignOut';
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/patienttable" element={<PatientTable/>} />
          <Route path="/patientform" element={<PatientForm/>} />
          <Route path="/temp" element={<Temp/>} />
        </Routes>
      </Router>
  );
}

export default App;
