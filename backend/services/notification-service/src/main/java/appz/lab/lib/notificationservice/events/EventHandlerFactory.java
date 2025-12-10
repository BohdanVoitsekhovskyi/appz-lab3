package appz.lab.lib.notificationservice.events;


import appz.lab.common.lib.notification.BaseEvent;
import appz.lab.lib.notificationservice.events.handlers.EventHandler;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EventHandlerFactory {

    private final List<EventHandler<?>> handlers;

    public EventHandlerFactory(List<EventHandler<?>> handlers) {
        this.handlers = handlers;
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseEvent> EventHandler<T> getHandler(BaseEvent event) {
        return (EventHandler<T>) handlers.stream()
                .filter(h -> h.supports(event))
                .findFirst()
                .orElseThrow(() ->
                        new IllegalArgumentException("No handler found for event: " + event.getClass().getSimpleName())
                );
    }
}