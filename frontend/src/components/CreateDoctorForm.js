import React, { useState } from 'react';
import { registerDoctor } from '../services/headDoctorService';
import './CreateDoctorForm.css';

const CreateDoctorForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    specialty: '',
    experience: '',
    schedule: {}
  });
  const [scheduleDays, setScheduleDays] = useState([
    { day: 'MONDAY', times: [] },
    { day: 'TUESDAY', times: [] },
    { day: 'WEDNESDAY', times: [] },
    { day: 'THURSDAY', times: [] },
    { day: 'FRIDAY', times: [] },
    { day: 'SATURDAY', times: [] },
    { day: 'SUNDAY', times: [] }
  ]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleTimeAdd = (dayIndex, time) => {
    if (!time) return;
    
    const updatedDays = [...scheduleDays];
    if (!updatedDays[dayIndex].times.includes(time)) {
      updatedDays[dayIndex].times.push(time);
    }
    setScheduleDays(updatedDays);
    updateSchedule();
  };

  const handleTimeRemove = (dayIndex, timeIndex) => {
    const updatedDays = [...scheduleDays];
    updatedDays[dayIndex].times.splice(timeIndex, 1);
    setScheduleDays(updatedDays);
    updateSchedule();
  };

  const updateSchedule = () => {
    const schedule = {};
    scheduleDays.forEach(({ day, times }) => {
      if (times.length > 0) {
        schedule[day] = times;
      }
    });
    setFormData({ ...formData, schedule });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.email || !formData.password || !formData.firstName || 
        !formData.lastName || !formData.specialty || !formData.experience) {
      setError('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const experience = parseInt(formData.experience);
    if (isNaN(experience) || experience < 0) {
      setError('Experience must be a valid positive number');
      return;
    }

    setLoading(true);

    try {
      const doctorData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        specialty: formData.specialty,
        experience: experience,
        schedule: formData.schedule
      };

      await registerDoctor(doctorData);
      
      setSuccess('Doctor account created successfully!');
      // Reset form
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        specialty: '',
        experience: '',
        schedule: {}
      });
      setScheduleDays(scheduleDays.map(day => ({ ...day, times: [] })));
    } catch (err) {
      setError(err.message || 'Failed to create doctor account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-doctor-form-container">
      <h2>Create New Doctor Account</h2>
      
      <form onSubmit={handleSubmit} className="doctor-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="specialty">Specialty *</label>
            <input
              type="text"
              id="specialty"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="e.g., Cardiology, Pediatrics"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience (years) *</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Years of experience"
              min="0"
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="schedule-section">
          <h3>Schedule (Optional)</h3>
          <p className="schedule-hint">Add available time slots for each day</p>
          
          {scheduleDays.map((dayData, dayIndex) => (
            <div key={dayData.day} className="schedule-day">
              <label className="day-label">{dayData.day}</label>
              <div className="time-input-group">
                <input
                  type="time"
                  className="time-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTimeAdd(dayIndex, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value) {
                      handleTimeAdd(dayIndex, e.target.value);
                      e.target.value = '';
                    }
                  }}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="add-time-button"
                  onClick={(e) => {
                    e.preventDefault();
                    const input = e.target.previousElementSibling;
                    if (input.value) {
                      handleTimeAdd(dayIndex, input.value);
                      input.value = '';
                    }
                  }}
                  disabled={loading}
                >
                  Add
                </button>
              </div>
              <div className="time-slots">
                {dayData.times.map((time, timeIndex) => (
                  <span key={timeIndex} className="time-slot">
                    {time}
                    <button
                      type="button"
                      className="remove-time"
                      onClick={() => handleTimeRemove(dayIndex, timeIndex)}
                      disabled={loading}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" role="alert">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Doctor Account'}
        </button>
      </form>
    </div>
  );
};

export default CreateDoctorForm;

