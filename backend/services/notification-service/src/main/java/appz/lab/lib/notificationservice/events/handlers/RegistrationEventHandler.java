package appz.lab.lib.notificationservice.events.handlers;

import appz.lab.common.lib.notification.BaseEvent;
import appz.lab.common.lib.notification.SuccessfulRegistrationEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RegistrationEventHandler implements EventHandler<SuccessfulRegistrationEvent> {

    private final MailSender mailSender;

    @Override
    public boolean supports(BaseEvent event) {
        return event instanceof SuccessfulRegistrationEvent;
    }

    @Override
    public void handle(SuccessfulRegistrationEvent event) {
        String text = String.format(
                "Hello %s! Your registration was successful!",
                event.getName() + " " + event.getSurname()
        );

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(event.getEmail());
        mailMessage.setSubject("Registration Successful");
        mailMessage.setText(text);

        mailSender.send(mailMessage);
    }
}
