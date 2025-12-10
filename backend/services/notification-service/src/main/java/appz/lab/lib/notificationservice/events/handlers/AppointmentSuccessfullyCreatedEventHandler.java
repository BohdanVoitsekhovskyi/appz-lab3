package appz.lab.lib.notificationservice.events.handlers;

import appz.lab.lib.notificationservice.events.events.AppointmentSuccessfullyCreatedEvent;
import appz.lab.lib.notificationservice.events.events.BaseEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AppointmentSuccessfullyCreatedEventHandler implements EventHandler<AppointmentSuccessfullyCreatedEvent> {

    private final MailSender mailSender;

    @Override
    public boolean supports(BaseEvent event) {
        return event instanceof AppointmentSuccessfullyCreatedEvent;
    }

    @Override
    public void handle(AppointmentSuccessfullyCreatedEvent event) {
        String text = String.format(
                "Your appointment was successfully created with Dr. %s.",
                event.getDoctorName()
        );

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(event.getPatientEmail());
        mailMessage.setText(text);
        mailMessage.setSubject("Appointment Successfully Created");

        mailSender.send(mailMessage);

    }
}
