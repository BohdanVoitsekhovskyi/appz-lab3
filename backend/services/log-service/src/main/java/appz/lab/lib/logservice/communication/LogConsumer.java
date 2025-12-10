package appz.lab.lib.logservice.communication;

import appz.lab.lib.logservice.models.RequestLogBucket;
import appz.lab.lib.logservice.services.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogConsumer {

    private final LogService logService;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void receiveLogMessage(RequestLogBucket bucket) {
        logService.saveLogs(bucket.getServiceName(), bucket.getLogs());
    }
}
