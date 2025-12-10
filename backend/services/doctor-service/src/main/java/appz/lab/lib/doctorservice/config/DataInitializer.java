package appz.lab.lib.doctorservice.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RestTemplate restTemplate;

    @Value("${user.service.url:http://localhost:8081}")
    private String userServiceUrl;

    @PostConstruct
    public void init() {
        ensureHeadDoctorExists();
    }

    private void ensureHeadDoctorExists() {
        try {
            // Call user-service endpoint to ensure HEAD_DOCTOR exists
            String ensureUrl = userServiceUrl + "/auth/ensure-head-doctor";
            
            ResponseEntity<String> response = restTemplate.postForEntity(ensureUrl, null, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                log.info("HEAD_DOCTOR user ensured to exist in user-service database");
            } else {
                log.warn("Failed to ensure HEAD_DOCTOR user exists. Response status: {}", response.getStatusCode());
            }
        } catch (RestClientException e) {
            log.error("Failed to ensure HEAD_DOCTOR user exists. User-service may not be running or accessible at {}. " +
                    "Error: {}", userServiceUrl, e.getMessage());
            log.warn("Please ensure user-service is running and accessible. HEAD_DOCTOR user should be created by user-service DataInitializer.");
        }
    }
}

