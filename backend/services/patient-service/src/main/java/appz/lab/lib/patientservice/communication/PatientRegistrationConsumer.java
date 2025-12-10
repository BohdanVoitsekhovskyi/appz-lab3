package appz.lab.lib.patientservice.communication;

import appz.lab.common.lib.pojos.PatientRegistrationBody;
import appz.lab.lib.patientservice.entities.Patient;
import appz.lab.lib.patientservice.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientRegistrationConsumer {

    private final PatientRepository patientRepository;

    @RabbitListener(queues = "patient.registration.queue")
    public void receivePatientRegistrationMessage(PatientRegistrationBody body) {
        Patient patient = new Patient();

        patient.setUserId(body.getUserId());
        patient.setFirstName(body.getFirstName());
        patient.setLastName(body.getLastName());
        patient.setDateOfBirth(body.getDateOfBirth());
        patient.setAddress(body.getAddress());
        patient.setPhoneNumber(body.getPhoneNumber());

        patientRepository.save(patient);


    }

}
