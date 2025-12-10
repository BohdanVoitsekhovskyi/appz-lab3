package appz.lab.lib.patientservice.communication;

import appz.lab.common.lib.notification.SuccessfulRegistrationEvent;
import appz.lab.common.lib.pojos.PatientRegistrationBody;
import appz.lab.lib.patientservice.entities.Patient;
import appz.lab.lib.patientservice.repository.PatientRepository;
import appz.lab.lib.patientservice.services.PatientService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientRegistrationConsumer {

    private final PatientRepository patientRepository;
    private final NotificationProducer notificationProducer;

    @RabbitListener(queues = "patient.registration.queue")
    public void receivePatientRegistrationMessage(PatientRegistrationBody body) {
        Patient patient = new Patient();

        patient.setUserId(body.getUserId());
        patient.setFirstName(body.getFirstName());
        patient.setLastName(body.getLastName());
        patient.setDateOfBirth(body.getDateOfBirth());
        patient.setAddress(body.getAddress());
        patient.setPhoneNumber(body.getPhoneNumber());
        patient.setEmail(body.getEmail());

        patientRepository.save(patient);

        notificationProducer.sendSuccessfulRegistrationEvent(
                new SuccessfulRegistrationEvent(patient.getEmail(), patient.getFirstName(), patient.getLastName())
        );


    }

}
