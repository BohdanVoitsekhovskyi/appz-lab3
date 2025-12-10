import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import HeadDoctorDashboard from './components/HeadDoctorDashboard';
import AppointmentDetail from './components/AppointmentDetail';
import CreateAppointment from './components/CreateAppointment';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/head-doctor-dashboard" element={<HeadDoctorDashboard />} />
          <Route path="/appointment/:appointmentId" element={<AppointmentDetail />} />
          <Route path="/create-appointment/:doctorId" element={<CreateAppointment />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

