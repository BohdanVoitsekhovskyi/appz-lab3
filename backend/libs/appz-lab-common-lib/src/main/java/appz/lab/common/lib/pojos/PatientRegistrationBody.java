package appz.lab.common.lib.pojos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientRegistrationBody {
    Long userId;
    String firstName;
    String lastName;
    String email;
    LocalDate dateOfBirth;
    String address;
    String phoneNumber;
}
