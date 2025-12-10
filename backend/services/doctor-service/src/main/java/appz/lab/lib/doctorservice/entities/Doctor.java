package appz.lab.lib.doctorservice.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@Document(collection = "doctors")
public class Doctor {
    @Id
    private Long userId;
    private String firstName;
    private String lastName;
    private String specialty;
    private Integer experience;
    private Map<DayOfWeek, List<LocalTime>> schedule;
}
