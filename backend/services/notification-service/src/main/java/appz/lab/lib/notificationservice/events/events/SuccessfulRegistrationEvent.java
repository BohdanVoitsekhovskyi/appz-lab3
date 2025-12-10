package appz.lab.lib.notificationservice.events.events;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SuccessfulRegistrationEvent extends BaseEvent {
    private String email;
    private String name;
    private String surname;
}
