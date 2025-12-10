package appz.lab.lib.userservice.communication;

import appz.lab.common.lib.pojos.DoctorRegistrationBody;
import appz.lab.common.lib.pojos.PatientRegistrationBody;
import appz.lab.lib.userservice.config.RabbitMqConfig;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RegistrationProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendPatientRegistrationBody(PatientRegistrationBody patientRegistrationBody) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.DoctorRegistrationQueueName, patientRegistrationBody);
    }
    public void sendDoctorRegistrationBody(DoctorRegistrationBody doctorRegistrationBody) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.DoctorRegistrationQueueName, doctorRegistrationBody);
    }

}
