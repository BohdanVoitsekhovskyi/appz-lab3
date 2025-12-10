package appz.lab.common.lib.pojos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class PatientRegistrationBody {
    Long userId;
    String firstName;
    String lastName;
    LocalDate dateOfBirth;
    String address;
    String phoneNumber;
}
