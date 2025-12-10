package appz.lab.lib.doctorservice.communication;

import appz.lab.common.lib.notification.AppointmentSuccessfullyCreatedEvent;
import appz.lab.common.lib.notification.SuccessfulRegistrationEvent;

import appz.lab.lib.doctorservice.config.RabbitMqConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationProducer {
    private final RabbitTemplate rabbitTemplate;

    public void sendSuccessfulRegistrationEvent(SuccessfulRegistrationEvent event) {
        rabbitTemplate.convertAndSend(RabbitMqConfig.NotificationQueue, event);
    }
}
