package appz.lab.lib.doctorservice.controllers;

import appz.lab.lib.doctorservice.entities.Doctor;
import appz.lab.lib.doctorservice.services.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{userId}")
    public Doctor getDoctorById(@PathVariable Long userId) {
        return doctorService.getDoctorById(userId);
    }
}


