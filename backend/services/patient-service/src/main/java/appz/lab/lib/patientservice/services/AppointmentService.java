package appz.lab.lib.patientservice.services;

import appz.lab.common.lib.notification.AppointmentSuccessfullyCreatedEvent;
import appz.lab.lib.patientservice.communication.NotificationProducer;
import appz.lab.lib.patientservice.dto.AppointmentDto;
import appz.lab.lib.patientservice.entities.Appointment;
import appz.lab.lib.patientservice.entities.Patient;
import appz.lab.lib.patientservice.repository.AppointmentRepository;
import appz.lab.lib.patientservice.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final NotificationProducer notificationProducer;
    private final PatientRepository patientRepository;

    public void createAppointment(AppointmentDto dto){
        Appointment appointment = new Appointment();
        appointment.setPatientId(dto.getPatientId());
        appointment.setDoctorId(dto.getDoctorId());
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setReasonForVisit(dto.getReasonForVisit());

        appointmentRepository.save(appointment);

        Patient patient = patientRepository.findById(dto.getPatientId()).orElseThrow(EntityNotFoundException::new);
        notificationProducer.sendAppointmentCreationEvent(
                new AppointmentSuccessfullyCreatedEvent(patientRepository.findById(appointment.getPatientId())
                        .orElseThrow(EntityNotFoundException::new).getEmail(),
                        "",LocalDateTime.of(appointment.getAppointmentDate(),appointment.getAppointmentTime()))
        );
    }
    public List<Appointment> getAppointmentListById(Long id) {
        return appointmentRepository.findByPatientId(id);
    }
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public List<Appointment> getAppointmentsByDoctorAndDate(Long doctorId, LocalDate date) {
        return appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, date);
    }

    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }
}
