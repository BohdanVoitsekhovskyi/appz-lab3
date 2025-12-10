package appz.lab.lib.userservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.JacksonJsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {

    public static final String PatientRegistrationQueue = "patient.registration.queue";
    public static final String DoctorRegistrationQueueName = "doctor.registration.queue";
    @Bean
    public Queue patientRegistrationQueueName() {
        return new Queue(PatientRegistrationQueue, true);
    }
    @Bean
    public Queue doctorRegistrationQueueName() {
        return new Queue(DoctorRegistrationQueueName, true);
    }

    @Bean
    public JacksonJsonMessageConverter jacksonMessageConverter() {
        return new JacksonJsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory,
                                         MessageConverter messageConverter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter);
        template.setObservationEnabled(true);
        return template;
    }
}
