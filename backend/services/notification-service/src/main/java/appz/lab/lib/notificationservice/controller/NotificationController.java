package appz.lab.lib.notificationservice.controller;

import appz.lab.common.lib.notification.BaseEvent;
import appz.lab.lib.notificationservice.events.EventHandlerFactory;
import appz.lab.lib.notificationservice.events.handlers.EventHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final EventHandlerFactory handlerFactory;

    @PostMapping("/triger")
    public void triggerNotification(@RequestBody BaseEvent event) {
       log.info("Triggering notification for event via REST CALL: {}", event.getClass().getSimpleName());
        EventHandler<BaseEvent> handler = handlerFactory.getHandler(event);
        handler.handle(event);
    }
}
