package appz.lab.lib.patientservice.controllers;

import appz.lab.lib.patientservice.entities.Appointment;
import appz.lab.lib.patientservice.services.AppointmentService;
import appz.lab.lib.patientservice.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;
    private final AppointmentService appointmentService;

    @GetMapping("/{patientId}/appointments")
    public List<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.getAppointmentListById(id);
    }
}
