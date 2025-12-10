import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctorAppointments } from '../services/patientService';
import './DoctorAppointmentsList.css';

const DoctorAppointmentsList = ({ doctorId }) => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'past', 'future'

  useEffect(() => {
    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getDoctorAppointments(doctorId);
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    if (typeof timeString === 'string') {
      return timeString;
    }
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isPastAppointment = (appointment) => {
    if (!appointment.appointmentDate) return false;
    const appointmentDateTime = new Date(
      `${appointment.appointmentDate}T${appointment.appointmentTime || '00:00:00'}`
    );
    return appointmentDateTime < new Date();
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'past') {
      return isPastAppointment(appointment);
    } else if (filter === 'future') {
      return !isPastAppointment(appointment);
    }
    return true;
  });

  const handleAppointmentClick = (appointmentId) => {
    navigate(`/appointment/${appointmentId}`);
  };

  if (loading) {
    return (
      <div className="doctor-appointments-list-container">
        <div className="loading">Loading appointments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctor-appointments-list-container">
        <div className="error-message">{error}</div>
        <button className="retry-button" onClick={fetchAppointments}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="doctor-appointments-list-container">
      <div className="appointments-header">
        <h2>My Appointments</h2>
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-button ${filter === 'past' ? 'active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
          <button
            className={`filter-button ${filter === 'future' ? 'active' : ''}`}
            onClick={() => setFilter('future')}
          >
            Future
          </button>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="no-appointments">
          {filter === 'all' 
            ? 'You have no appointments yet.' 
            : `You have no ${filter} appointments.`}
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.appointmentId}
              className={`appointment-card ${isPastAppointment(appointment) ? 'past' : 'future'}`}
              onClick={() => handleAppointmentClick(appointment.appointmentId)}
            >
              <div className="appointment-header">
                <h3>Appointment #{appointment.appointmentId}</h3>
                <span className={`appointment-status ${isPastAppointment(appointment) ? 'past' : 'upcoming'}`}>
                  {isPastAppointment(appointment) ? 'Past' : 'Upcoming'}
                </span>
              </div>
              <div className="appointment-info">
                <p>
                  <strong>Date:</strong> {formatDate(appointment.appointmentDate)}
                </p>
                <p>
                  <strong>Time:</strong> {formatTime(appointment.appointmentTime)}
                </p>
                <p>
                  <strong>Patient ID:</strong> {appointment.patientId || 'N/A'}
                </p>
                {appointment.reasonForVisit && (
                  <p>
                    <strong>Reason:</strong> {appointment.reasonForVisit}
                  </p>
                )}
              </div>
              <div className="appointment-footer">
                <span className="click-hint">Click to view details →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorAppointmentsList;

