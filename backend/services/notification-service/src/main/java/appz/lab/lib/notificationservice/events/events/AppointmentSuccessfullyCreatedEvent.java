package appz.lab.lib.notificationservice.events.events;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentSuccessfullyCreatedEvent extends BaseEvent {

    private String patientEmail;
    private String doctorName;
    private LocalDateTime appointmentDateTime;
}
