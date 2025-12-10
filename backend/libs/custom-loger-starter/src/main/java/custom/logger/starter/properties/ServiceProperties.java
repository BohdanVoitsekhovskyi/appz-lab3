package custom.logger.starter.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "service")
public class ServiceProperties {
    private String name;
}
