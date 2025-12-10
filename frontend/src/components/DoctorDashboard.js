import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorAppointmentsList from './DoctorAppointmentsList';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('appointments');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user || !user.id) {
    navigate('/login');
    return null;
  }

  if (user.role !== 'DOCTOR') {
    navigate('/dashboard');
    return null;
  }

  const doctorId = user.id || user.userId || user.user_id;

  return (
    <div className="doctor-dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Doctor Dashboard</h1>
          <p>Welcome, {user.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-nav">
        <button
          className={`nav-button ${activeView === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveView('appointments')}
        >
          My Appointments
        </button>
      </div>

      <div className="dashboard-content">
        {activeView === 'appointments' && <DoctorAppointmentsList doctorId={doctorId} />}
      </div>
    </div>
  );
};

export default DoctorDashboard;

