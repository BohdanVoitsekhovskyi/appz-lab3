package custom.logger.starter.config;

import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMqConfig {
    public static final String DEFAULT_LOGS_QUEUE = "logs.queue";
}
