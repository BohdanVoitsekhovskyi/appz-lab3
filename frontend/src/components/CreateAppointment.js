import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDoctorById, createAppointment, getAppointmentsByDoctorAndDate } from '../services/patientService';
import './CreateAppointment.css';

const CreateAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const doctorFromState = location.state?.doctor;

  const [doctor, setDoctor] = useState(doctorFromState || null);
  const [loading, setLoading] = useState(!doctorFromState);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const patientId = user.id || user.userId || user.user_id;

  useEffect(() => {
    if (!doctorFromState && doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate && doctor) {
      fetchBookedAppointments();
    }
  }, [selectedDate, doctor]);

  useEffect(() => {
    if (selectedDate && doctor) {
      calculateAvailableTimeSlots();
    }
  }, [selectedDate, doctor, bookedAppointments]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getDoctorById(doctorId);
      setDoctor(data);
    } catch (err) {
      setError(err.message || 'Failed to load doctor information');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedAppointments = async () => {
    try {
      const appointments = await getAppointmentsByDoctorAndDate(doctor.userId, selectedDate);
      setBookedAppointments(appointments || []);
    } catch (err) {
      console.error('Failed to fetch booked appointments:', err);
      setBookedAppointments([]);
    }
  };

  const calculateAvailableTimeSlots = () => {
    if (!doctor || !doctor.schedule || !selectedDate) {
      setAvailableTimeSlots([]);
      return;
    }

    // Get day of week from selected date
    const date = new Date(selectedDate + 'T00:00:00');
    const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const selectedDay = dayNames[dayIndex];
    
    const daySchedule = doctor.schedule[selectedDay] || [];

    if (daySchedule.length === 0) {
      setAvailableTimeSlots([]);
      return;
    }

    // Get booked times for the selected date
    const bookedTimes = bookedAppointments.map(apt => {
      if (typeof apt.appointmentTime === 'string') {
        // Normalize time format (HH:mm)
        const timeParts = apt.appointmentTime.split(':');
        if (timeParts.length >= 2) {
          return `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}`;
        }
        return apt.appointmentTime;
      }
      return null;
    }).filter(Boolean);

    // Filter out booked times
    const available = daySchedule.filter(time => {
      const timeStr = formatTime(time);
      // Normalize for comparison
      const normalizedTime = timeStr.length === 5 ? timeStr : timeStr.substring(0, 5);
      return !bookedTimes.some(booked => {
        const normalizedBooked = booked.length === 5 ? booked : booked.substring(0, 5);
        return normalizedBooked === normalizedTime;
      });
    });

    setAvailableTimeSlots(available);
  };

  const formatTime = (time) => {
    if (typeof time === 'string') {
      return time;
    }
    if (time && time.hour !== undefined) {
      return `${String(time.hour).padStart(2, '0')}:${String(time.minute || 0).padStart(2, '0')}`;
    }
    return time;
  };

  const getMinDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!selectedDate || !selectedTime || !reasonForVisit.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!patientId) {
      setError('Please login to create an appointment');
      navigate('/login');
      return;
    }

    setSubmitting(true);

    try {
      const appointmentData = {
        patientId: patientId,
        doctorId: doctor.userId,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        reasonForVisit: reasonForVisit.trim()
      };

      await createAppointment(appointmentData);
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="create-appointment-container">
        <div className="loading">Loading doctor information...</div>
      </div>
    );
  }

  if (error && !doctor) {
    return (
      <div className="create-appointment-container">
        <div className="error-message">{error}</div>
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          Go Back
        </button>
      </div>
    );
  }

  if (!doctor) {
    return null;
  }

  return (
    <div className="create-appointment-container">
      <div className="appointment-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← Back to Doctors
        </button>
        <h1>Book Appointment</h1>
      </div>

      <div className="doctor-info-card">
        <h2>Dr. {doctor.firstName} {doctor.lastName}</h2>
        <p><strong>Specialty:</strong> {doctor.specialty}</p>
        <p><strong>Experience:</strong> {doctor.experience || 'N/A'} years</p>
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="appointmentDate">Select Date *</label>
          <input
            type="date"
            id="appointmentDate"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setSelectedTime(''); // Reset time when date changes
            }}
            min={getMinDate()}
            required
            disabled={submitting}
          />
          {selectedDate && availableTimeSlots.length === 0 && (
            <p className="hint-text">
              No available time slots for this date. Please select another date.
            </p>
          )}
        </div>

        {selectedDate && availableTimeSlots.length > 0 && (
          <div className="form-group">
            <label>Select Time Slot *</label>
            <div className="time-slots-grid">
              {availableTimeSlots.map((time, index) => {
                const timeStr = formatTime(time);
                return (
                  <button
                    key={index}
                    type="button"
                    className={`time-slot-button ${selectedTime === timeStr ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(timeStr)}
                    disabled={submitting}
                  >
                    {timeStr}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="reasonForVisit">Reason for Visit *</label>
          <textarea
            id="reasonForVisit"
            value={reasonForVisit}
            onChange={(e) => setReasonForVisit(e.target.value)}
            placeholder="Please describe the reason for your visit..."
            rows="4"
            required
            disabled={submitting}
          />
        </div>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" role="alert">
            Appointment created successfully! Redirecting to dashboard...
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={submitting || !selectedDate || !selectedTime || !reasonForVisit.trim()}
        >
          {submitting ? 'Creating Appointment...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default CreateAppointment;

