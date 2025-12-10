package appz.lab.lib.patientservice.services;

import appz.lab.lib.patientservice.entities.Patient;
import appz.lab.lib.patientservice.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;


    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }


}
