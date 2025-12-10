package appz.lab.lib.userservice.services;

import appz.lab.lib.userservice.dto.DoctorRegistrationDto;
import appz.lab.lib.userservice.dto.PatientRegistrationDto;
import appz.lab.lib.userservice.entities.User;

public interface UserService {
    User get(Long id);
    void addAsDoctor(DoctorRegistrationDto dto);
    void addAsPatient(PatientRegistrationDto dto);
}
