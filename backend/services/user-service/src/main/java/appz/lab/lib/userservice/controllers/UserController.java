package appz.lab.lib.userservice.controllers;


import appz.lab.lib.userservice.dto.DoctorRegistrationDto;
import appz.lab.lib.userservice.dto.PatientRegistrationDto;
import appz.lab.lib.userservice.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequestMapping("/users")
public class UserController {

    private  final UserService userService;

    @PostMapping("/register/patient")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerPatient(@RequestBody PatientRegistrationDto dto) {
        userService.addAsPatient(dto);
    }

    @PostMapping("/register/doctor")
    @ResponseStatus(HttpStatus.CREATED)
    public void registerDoctor(@RequestBody DoctorRegistrationDto dto) {
        userService.addAsDoctor(dto);
    }
}
