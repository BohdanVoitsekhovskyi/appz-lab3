package appz.lab.lib.userservice.services.impl;

import appz.lab.lib.userservice.entities.User;
import appz.lab.lib.userservice.models.UserRole;
import appz.lab.lib.userservice.repository.UserRepository;
import appz.lab.lib.userservice.services.AuthService;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;


    public User authenticate(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password).orElseThrow(EntityExistsException::new);
    }

    @Override
    public void ensureHeadDoctorExists() {
        String headDoctorEmail = "headdoctor@gmail.com";
        String headDoctorPassword = "1";

        // Check if user with correct credentials exists
        userRepository.findByEmailAndPassword(headDoctorEmail, headDoctorPassword)
                .ifPresentOrElse(
                    user -> {
                        // User exists with correct credentials, ensure role is HEAD_DOCTOR
                        if (!UserRole.HEAD_DOCTOR.equals(user.getRole())) {
                            // Delete and recreate with correct role
                            userRepository.delete(user);
                            createHeadDoctorUser(headDoctorEmail, headDoctorPassword);
                        }
                    },
                    () -> {
                        // User doesn't exist, create it
                        createHeadDoctorUser(headDoctorEmail, headDoctorPassword);
                    }
                );
    }

    private void createHeadDoctorUser(String email, String password) {
        User headDoctor = User.builder()
                .email(email)
                .password(password)
                .role(UserRole.HEAD_DOCTOR)
                .build();
        userRepository.save(headDoctor);
    }
}
