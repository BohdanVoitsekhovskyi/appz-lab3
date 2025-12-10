# API Routes Summary

This document lists all API endpoints for each service with their correct routes.

## User Service (Port: 8081)

### Authentication
- **GET** `/auth/authenticate?email={email}&password={password}`
  - Authenticates a user and returns User object
  - CORS enabled

### User Registration
- **POST** `/users/register/patient`
  - Registers a new patient
  - Request Body: `PatientRegistrationDto`
  - CORS enabled

- **POST** `/users/register/doctor`
  - Registers a new doctor
  - Request Body: `DoctorRegistrationDto`
  - CORS enabled

## Patient Service (Port: Check application.properties)

### Patients
- **GET** `/patients/{patientId}/appointments`
  - Gets all appointments for a specific patient
  - Path Variable: `patientId` (Long)
  - Returns: `List<Appointment>`
  - CORS enabled

### Appointments
- **GET** `/appointments/{appointmentId}`
  - Gets an appointment by ID
  - Path Variable: `appointmentId` (Long)
  - Returns: `Appointment`
  - CORS enabled

## Log Service (Port: Check application.properties)

### Logs
- **GET** `/logs/{serviceName}`
  - Gets logs for a specific service
  - Path Variable: `serviceName` (String)
  - Returns: `List<String>`
  - CORS enabled

## CORS Configuration

All controllers have CORS enabled with the following configuration:
- **Origins**: `*` (all origins allowed)
- **Allowed Headers**: `*` (all headers allowed)
- **Allowed Methods**: GET, POST, PUT, DELETE, OPTIONS

## Notes

- All endpoints use RESTful conventions
- Path variables must match the parameter names in the controller methods
- All controllers are properly annotated with `@CrossOrigin` for CORS support

