package appz.lab.lib.patientservice.communication;

import appz.lab.common.lib.pojos.PatientRegistrationBody;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientRegistrationConsumer {

    @RabbitListener(queues = "patient.registration.queue")
    public void receivePatientRegistrationMessage(PatientRegistrationBody body) {

    }

}
