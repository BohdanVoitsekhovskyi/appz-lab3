package custom.logger.starter.autoconfigurable;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import custom.logger.starter.appender.InMemoryLogAppender;
import custom.logger.starter.listener.LogOverloadHandler;
import custom.logger.starter.properties.LoggingProperties;
import custom.logger.starter.properties.ServiceProperties;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;

@AutoConfiguration
@EnableConfigurationProperties({ServiceProperties.class, LoggingProperties.class})
@ConditionalOnProperty(prefix = "custom.logging", name = "enabled", havingValue = "true", matchIfMissing = true)
@ConditionalOnClass(RabbitTemplate.class)
public class LoggerStarterAutoConfiguration {
    @Bean
    public InMemoryLogAppender inMemoryLogAppender(
            LoggingProperties properties,
            ApplicationEventPublisher publisher
    ) {
        InMemoryLogAppender appender = new InMemoryLogAppender(properties, publisher);
        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();

        appender.setContext(context);
        appender.setName("CUSTOM_MEMORY_APPENDER");
        appender.start();

        Logger rootLogger = context.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.addAppender(appender);
        rootLogger.setAdditive(true);

        return appender;
    }

    @Bean
    public LogOverloadHandler logOverloadHandler(
            RabbitTemplate rabbitTemplate,
            InMemoryLogAppender appender,
            ServiceProperties props
    ) {
        return new LogOverloadHandler(rabbitTemplate, appender, props);
    }

}
