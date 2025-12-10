package appz.lab.lib.logservice.repository;

import appz.lab.lib.logservice.entities.LogBucket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BucketRepository extends MongoRepository<LogBucket,String> {
    Optional<LogBucket> findByServiceName(String serviceName);
}
