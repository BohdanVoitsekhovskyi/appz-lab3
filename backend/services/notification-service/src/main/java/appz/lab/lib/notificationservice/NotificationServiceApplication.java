package appz.lab.lib.notificationservice;


import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
@Slf4j
public class NotificationServiceApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting Notification Service Application");
        log.info("1");
        log.info("2");
        log.info("3");
        log.info("4");
        log.info("5");
        log.info("1");
        log.info("2");
        log.info("3");
        log.info("4");
        log.info("5");
        log.info("1");
        log.info("2");
        log.info("3");
        log.info("4");
        log.info("5");
        log.info("1");
        log.info("2");
        log.info("3");
        log.info("4");
        log.info("5");
    }
}
