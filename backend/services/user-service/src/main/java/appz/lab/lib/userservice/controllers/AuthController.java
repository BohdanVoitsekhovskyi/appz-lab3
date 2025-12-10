package appz.lab.lib.userservice.controllers;


import appz.lab.lib.userservice.entities.User;
import appz.lab.lib.userservice.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/authenticate")
    public ResponseEntity<User> authenticate(@RequestParam String email, @RequestParam String password) {
        return ResponseEntity.ok(authService.authenticate(email, password));
    }

    @PostMapping("/ensure-head-doctor")
    public ResponseEntity<String> ensureHeadDoctor() {
        authService.ensureHeadDoctorExists();
        return ResponseEntity.ok("HEAD_DOCTOR user ensured to exist");
    }

}
