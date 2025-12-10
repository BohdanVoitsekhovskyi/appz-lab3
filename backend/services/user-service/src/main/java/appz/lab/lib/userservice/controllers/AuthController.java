package appz.lab.lib.userservice.controllers;


import appz.lab.lib.userservice.entities.User;
import appz.lab.lib.userservice.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/authenticate")
    public ResponseEntity<User> authenticate(@RequestParam String email, @RequestParam String password) {
        return ResponseEntity.ok(authService.authenticate(email, password));
    }


}
