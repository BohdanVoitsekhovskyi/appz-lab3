package appz.lab.lib.doctorservice.communication;

import appz.lab.common.lib.notification.SuccessfulRegistrationEvent;
import appz.lab.common.lib.pojos.DoctorRegistrationBody;
import appz.lab.lib.doctorservice.entities.Doctor;
import appz.lab.lib.doctorservice.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorRegistrationConsumer {

    private final DoctorRepository doctorRepository;
    private final NotificationProducer notificationProducer;

    @RabbitListener(queues = "doctor.registration.queue")
    public void receivePatientRegistrationMessage(DoctorRegistrationBody body) {
        Doctor doctor = new Doctor();

        doctor.setUserId(body.getUserId());
        doctor.setFirstName(body.getFirstName());
        doctor.setLastName(body.getLastName());
        doctor.setExperience(body.getExperience());
        doctor.setSpecialty(body.getSpecialty());
        doctor.setSchedule(body.getSchedule());
        doctor.setEmail(body.getEmail());

        doctorRepository.save(doctor);

        notificationProducer.sendSuccessfulRegistrationEvent(
                new SuccessfulRegistrationEvent(doctor.getEmail(),doctor.getFirstName(),doctor.getLastName())
        );


    }
}
