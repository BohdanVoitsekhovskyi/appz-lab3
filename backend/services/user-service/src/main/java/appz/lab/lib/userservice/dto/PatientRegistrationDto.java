package appz.lab.lib.userservice.dto;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PatientRegistrationDto {
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;
    private String phone;
    private String email;
    private String password;
    private String address;
}
