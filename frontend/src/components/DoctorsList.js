import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors } from '../services/patientService';
import './DoctorsList.css';

const DoctorsList = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [doctors, specialtyFilter, experienceFilter]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAllDoctors();
      setDoctors(data);
      
      // Extract unique specialties
      const specialties = [...new Set(data.map(doc => doc.specialty).filter(Boolean))];
      setAvailableSpecialties(specialties.sort());
    } catch (err) {
      setError(err.message || 'Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...doctors];

    // Apply specialty filter
    if (specialtyFilter) {
      filtered = filtered.filter(doctor => 
        doctor.specialty && doctor.specialty.toLowerCase().includes(specialtyFilter.toLowerCase())
      );
    }

    // Apply experience filter
    if (experienceFilter) {
      const minExperience = parseInt(experienceFilter);
      if (!isNaN(minExperience)) {
        filtered = filtered.filter(doctor => 
          doctor.experience && doctor.experience >= minExperience
        );
      }
    }

    setFilteredDoctors(filtered);
  };

  const handleDoctorClick = (doctor) => {
    navigate(`/create-appointment/${doctor.userId}`, { state: { doctor } });
  };

  const formatSchedule = (schedule) => {
    if (!schedule || Object.keys(schedule).length === 0) {
      return 'Schedule not available';
    }

    const dayNames = {
      MONDAY: 'Mon',
      TUESDAY: 'Tue',
      WEDNESDAY: 'Wed',
      THURSDAY: 'Thu',
      FRIDAY: 'Fri',
      SATURDAY: 'Sat',
      SUNDAY: 'Sun'
    };

    return Object.entries(schedule)
      .map(([day, times]) => {
        const dayName = dayNames[day] || day;
        const timeStr = Array.isArray(times) && times.length > 0
          ? times.map(t => typeof t === 'string' ? t : `${t.hour}:${String(t.minute).padStart(2, '0')}`).join(', ')
          : 'N/A';
        return `${dayName}: ${timeStr}`;
      })
      .join(' | ');
  };

  if (loading) {
    return (
      <div className="doctors-list-container">
        <div className="loading">Loading doctors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="doctors-list-container">
        <div className="error-message">{error}</div>
        <button className="retry-button" onClick={fetchDoctors}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="doctors-list-container">
      <h2>Available Doctors</h2>
      
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="specialty-filter">Specialty:</label>
          <select
            id="specialty-filter"
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Specialties</option>
            {availableSpecialties.map(specialty => (
              <option key={specialty} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="experience-filter">Min Experience (years):</label>
          <input
            type="number"
            id="experience-filter"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            placeholder="e.g., 5"
            min="0"
            className="filter-input"
          />
        </div>

        <div className="doctor-count">
          Showing {filteredDoctors.length} of {doctors.length} doctors
        </div>
      </div>

      {doctors.length === 0 ? (
        <div className="no-doctors">No doctors available at the moment.</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="no-doctors">No doctors match the current filters.</div>
      ) : (
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div 
              key={doctor.userId} 
              className="doctor-card clickable"
              onClick={() => handleDoctorClick(doctor)}
            >
              <div className="doctor-header">
                <h3>{doctor.firstName} {doctor.lastName}</h3>
                <span className="doctor-specialty">{doctor.specialty}</span>
              </div>
              <div className="doctor-info">
                <p className="doctor-experience">
                  <strong>Experience:</strong> {doctor.experience || 'N/A'} years
                </p>
                <p className="doctor-schedule">
                  <strong>Schedule:</strong> {formatSchedule(doctor.schedule)}
                </p>
              </div>
              <div className="doctor-footer">
                <span className="click-hint">Click to book appointment →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;

