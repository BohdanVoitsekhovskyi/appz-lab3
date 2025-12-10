package appz.lab.lib.userservice.services;

import appz.lab.lib.userservice.entities.User;

public interface AuthService {
    User authenticate(String email, String password);
}
