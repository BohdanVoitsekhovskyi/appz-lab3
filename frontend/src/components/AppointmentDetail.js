import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAppointmentById } from '../services/patientService';
import './AppointmentDetail.css';

const AppointmentDetail = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointment();
  }, [appointmentId]);

  const fetchAppointment = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAppointmentById(appointmentId);
      setAppointment(data);
    } catch (err) {
      setError(err.message || 'Failed to load appointment details');
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
      day: 'numeric',
      weekday: 'long'
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

  const isPastAppointment = () => {
    if (!appointment || !appointment.appointmentDate) return false;
    const appointmentDateTime = new Date(
      `${appointment.appointmentDate}T${appointment.appointmentTime || '00:00:00'}`
    );
    return appointmentDateTime < new Date();
  };

  if (loading) {
    return (
      <div className="appointment-detail-container">
        <div className="loading">Loading appointment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="appointment-detail-container">
        <div className="error-message">{error}</div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="appointment-detail-container">
        <div className="error-message">Appointment not found</div>
        <button className="back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="appointment-detail-container">
      <div className="detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back to Appointments
        </button>
        <h1>Appointment Details</h1>
      </div>

      <div className={`appointment-detail-card ${isPastAppointment() ? 'past' : 'future'}`}>
        <div className="detail-header-section">
          <h2>Appointment #{appointment.appointmentId}</h2>
          <span className={`appointment-status ${isPastAppointment() ? 'past' : 'upcoming'}`}>
            {isPastAppointment() ? 'Past Appointment' : 'Upcoming Appointment'}
          </span>
        </div>

        <div className="detail-info-section">
          <div className="info-row">
            <div className="info-label">Date</div>
            <div className="info-value">{formatDate(appointment.appointmentDate)}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Time</div>
            <div className="info-value">{formatTime(appointment.appointmentTime)}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Patient ID</div>
            <div className="info-value">{appointment.patientId || 'N/A'}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Doctor ID</div>
            <div className="info-value">{appointment.doctorId || 'N/A'}</div>
          </div>

          {appointment.reasonForVisit && (
            <div className="info-row full-width">
              <div className="info-label">Reason for Visit</div>
              <div className="info-value">{appointment.reasonForVisit}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;

