package appz.lab.common.lib.pojos;

import lombok.AllArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class DoctorRegistrationBody {
    private Long userId;
    private String firstName;
    private String lastName;
    private String specialty;
    private Integer experience;
    private Map<DayOfWeek, List<LocalTime>> schedule;
}
