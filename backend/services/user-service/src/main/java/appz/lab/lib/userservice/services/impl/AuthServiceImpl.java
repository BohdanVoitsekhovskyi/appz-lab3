package appz.lab.lib.userservice.services.impl;

import appz.lab.lib.userservice.entities.User;
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
}
