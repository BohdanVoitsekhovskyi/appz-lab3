package appz.lab.common.lib.notification;

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
