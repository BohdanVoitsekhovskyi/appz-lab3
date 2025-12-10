package appz.lab.lib.userservice.controllers;


import appz.lab.lib.userservice.dto.DoctorRegistrationDto;
import appz.lab.lib.userservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private  final UserService userService;

    @PostMapping("/register/patient")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerPatient(@RequestBody DoctorRegistrationDto dto) {
        userService.addAsDoctor(dto);

    }

    @PostMapping("/register/doctor")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerDoctor(@RequestBody DoctorRegistrationDto dto) {
        userService.addAsDoctor(dto);
    }
}
