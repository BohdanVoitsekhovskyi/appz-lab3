package appz.lab.lib.userservice.dto;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Data
public class DoctorRegistrationDto {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String specialty;
    private Integer experience;
    private Map<DayOfWeek, List<LocalTime>> schedule;
}
