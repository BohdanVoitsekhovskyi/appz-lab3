package appz.lab.lib.doctorservice.services.impl;

import appz.lab.lib.doctorservice.entities.Doctor;
import appz.lab.lib.doctorservice.repository.DoctorRepository;
import appz.lab.lib.doctorservice.services.DoctorService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long userId) {
        return doctorRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + userId));
    }
}


