package custom.logger.starter.listener;


import appz.lab.common.lib.logs.RequestLogBucket;
import custom.logger.starter.appender.InMemoryLogAppender;
import custom.logger.starter.config.RabbitMqConfig;
import custom.logger.starter.event.LogListOverloadEvent;
import custom.logger.starter.properties.ServiceProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.event.EventListener;


@RequiredArgsConstructor
@Slf4j
public class LogOverloadHandler {

    private final RabbitTemplate rabbitTemplate;
    private final InMemoryLogAppender appender;
    private final ServiceProperties serviceProperties;


    @EventListener(LogListOverloadEvent.class)
    public void handleLogOverload(LogListOverloadEvent event) {
        log.info("Log list overload detected. Draining logs to RabbitMQ.");
        RequestLogBucket requestLogBucket = new RequestLogBucket();
        requestLogBucket.setServiceName(serviceProperties.getName());
        requestLogBucket.setLogs(appender.drainAll());

        rabbitTemplate.convertAndSend(RabbitMqConfig.DEFAULT_LOGS_QUEUE, requestLogBucket);
    }
}