import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorsList from './DoctorsList';
import AppointmentsList from './AppointmentsList';
import './PatientDashboard.css';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('doctors');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user || (!user.id && !user.userId)) {
    navigate('/login');
    return null;
  }

  const userId = user.id || user.userId || user.user_id;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Patient Dashboard</h1>
          <p>Welcome, {user.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-nav">
        <button
          className={`nav-button ${activeView === 'doctors' ? 'active' : ''}`}
          onClick={() => setActiveView('doctors')}
        >
          View Doctors
        </button>
        <button
          className={`nav-button ${activeView === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveView('appointments')}
        >
          My Appointments
        </button>
      </div>

      <div className="dashboard-content">
        {activeView === 'doctors' && <DoctorsList />}
        {activeView === 'appointments' && <AppointmentsList patientId={userId} />}
      </div>
    </div>
  );
};

export default PatientDashboard;

