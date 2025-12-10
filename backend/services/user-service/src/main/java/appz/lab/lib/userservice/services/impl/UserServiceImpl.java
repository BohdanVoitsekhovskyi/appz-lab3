package appz.lab.lib.userservice.services.impl;

import appz.lab.common.lib.pojos.DoctorRegistrationBody;
import appz.lab.common.lib.pojos.PatientRegistrationBody;
import appz.lab.lib.userservice.communication.RegistrationProducer;
import appz.lab.lib.userservice.dto.DoctorRegistrationDto;
import appz.lab.lib.userservice.dto.PatientRegistrationDto;
import appz.lab.lib.userservice.entities.User;
import appz.lab.lib.userservice.models.UserRole;
import appz.lab.lib.userservice.repository.UserRepository;
import appz.lab.lib.userservice.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RegistrationProducer registrationProducer;


    @Override
    public User get(Long id) {
        return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    public void addAsDoctor(DoctorRegistrationDto dto) {
        User userDataToSave = User.builder()
                .role(UserRole.DOCTOR)
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();

        User savedUser = userRepository.save(userDataToSave);

        DoctorRegistrationBody doctorRegistrationBody = new DoctorRegistrationBody(
                savedUser.getId(),
                dto.getFirstName(),
                dto.getLastName(),
                dto.getSpecialty(),
                dto.getExperience(),
                dto.getSchedule()
        );

        registrationProducer.sendDoctorRegistrationBody(doctorRegistrationBody);
    }

    @Override
    public void addAsPatient(PatientRegistrationDto dto) {
        User userDataToSave = User.builder()
                .role(UserRole.PATIENT)
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();

        User savedUser = userRepository.save(userDataToSave);

        PatientRegistrationBody patientRegistrationBody = PatientRegistrationBody.builder()
                .userId(savedUser.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .phoneNumber(dto.getPhone())
                .dateOfBirth(dto.getDateOfBirth())
                .address(dto.getAddress()).build();

        registrationProducer.sendPatientRegistrationBody(patientRegistrationBody);

    }



}
