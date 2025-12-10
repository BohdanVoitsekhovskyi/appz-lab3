package appz.lab.lib.notificationservice.communication;


import appz.lab.common.lib.notification.BaseEvent;
import appz.lab.lib.notificationservice.events.EventHandlerFactory;
import appz.lab.lib.notificationservice.events.handlers.EventHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EventConsumer {

    private final EventHandlerFactory handlerFactory;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void receiveMessage(BaseEvent event) {

        log.info("Received event: {}", event.getClass().getSimpleName());

        EventHandler<BaseEvent> handler = handlerFactory.getHandler(event);
        handler.handle(event);
    }
}