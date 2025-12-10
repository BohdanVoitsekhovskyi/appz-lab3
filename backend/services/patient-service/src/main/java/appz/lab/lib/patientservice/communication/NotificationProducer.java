package appz.lab.lib.patientservice.communication;

import appz.lab.common.lib.notification.AppointmentSuccessfullyCreatedEvent;
import appz.lab.common.lib.pojos.PatientRegistrationBody;
import appz.lab.lib.patientservice.config.RabbitMqConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendAppointmentCreationEvent(AppointmentSuccessfullyCreatedEvent event) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.NotificationQueue, event);
    }
}
