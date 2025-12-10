package appz.lab.lib.logservice.services.impl;

import appz.lab.lib.logservice.entities.LogBucket;
import appz.lab.lib.logservice.repository.BucketRepository;
import appz.lab.lib.logservice.services.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogServiceImpl implements LogService {

    private final BucketRepository bucketRepository;

    @Override
    public void saveLogs(String serviceName, List<String> logs) {
        bucketRepository.save(new LogBucket(serviceName, logs));
    }

    @Override
    public List<String> getLogs(String serviceName) {
        return bucketRepository.findByServiceName(serviceName)
                .orElseThrow().getLogs();
    }
}
