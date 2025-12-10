import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateDoctorForm from './CreateDoctorForm';
import LogsViewer from './LogsViewer';
import './HeadDoctorDashboard.css';

const HeadDoctorDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('create-doctor');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user || !user.id) {
    navigate('/login');
    return null;
  }

  if (user.role !== 'HEAD_DOCTOR') {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="head-doctor-dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Head Doctor Dashboard</h1>
          <p>Welcome, {user.email}</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-nav">
        <button
          className={`nav-button ${activeView === 'create-doctor' ? 'active' : ''}`}
          onClick={() => setActiveView('create-doctor')}
        >
          Create Doctor Account
        </button>
        <button
          className={`nav-button ${activeView === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveView('logs')}
        >
          View Logs
        </button>
      </div>

      <div className="dashboard-content">
        {activeView === 'create-doctor' && <CreateDoctorForm />}
        {activeView === 'logs' && <LogsViewer />}
      </div>
    </div>
  );
};

export default HeadDoctorDashboard;

