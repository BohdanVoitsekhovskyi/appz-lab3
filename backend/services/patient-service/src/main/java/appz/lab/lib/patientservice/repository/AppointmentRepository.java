package appz.lab.lib.patientservice.repository;

import appz.lab.lib.patientservice.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {

    List<Appointment> findByPatientId(Long patientId);
}
