package appz.lab.lib.doctorservice.services;

import appz.lab.lib.doctorservice.entities.Doctor;

import java.util.List;

public interface DoctorService {
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(Long userId);
}


