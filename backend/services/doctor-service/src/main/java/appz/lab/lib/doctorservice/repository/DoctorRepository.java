package appz.lab.lib.doctorservice.repository;

import appz.lab.lib.doctorservice.entities.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor,Long> {
}
