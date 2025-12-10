package appz.lab.lib.notificationservice;

import appz.lab.lib.notificationservice.events.EventHandlerFactory;
import appz.lab.lib.notificationservice.events.events.AppointmentSuccessfullyCreatedEvent;
import appz.lab.lib.notificationservice.events.events.BaseEvent;
import appz.lab.lib.notificationservice.events.events.SuccessfulRegistrationEvent;
import appz.lab.lib.notificationservice.events.handlers.EventHandler;
import appz.lab.lib.notificationservice.events.handlers.RegistrationEventHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.mail.MailSender;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@SpringBootApplication
@EnableDiscoveryClient
@RequiredArgsConstructor
public class NotificationServiceApplication implements CommandLineRunner {

    private final EventHandlerFactory factory;

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        BaseEvent event = new AppointmentSuccessfullyCreatedEvent(
                "bohdan.voitsekhovskyi.pz.2022@lpnu.ua","Dr. Smith", LocalDateTime.now()
        );
        EventHandler<BaseEvent> handler = factory.getHandler(event);
        handler.handle(event);
    }
}
