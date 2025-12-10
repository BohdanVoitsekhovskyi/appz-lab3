package custom.logger.starter.properties;


import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "custom.logging")
public class LoggingProperties {
    boolean enabled = true;
    private int maxLogEvents = 15;
}
