package appz.lab.lib.userservice.config;

import appz.lab.lib.userservice.entities.User;
import appz.lab.lib.userservice.models.UserRole;
import appz.lab.lib.userservice.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        // Ensure HEAD_DOCTOR user exists with credentials: headdoctor@gmail.com / 1
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

