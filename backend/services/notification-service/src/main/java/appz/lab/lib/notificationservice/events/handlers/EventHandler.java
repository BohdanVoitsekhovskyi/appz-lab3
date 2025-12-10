package appz.lab.lib.notificationservice.events.handlers;

import appz.lab.lib.notificationservice.events.events.BaseEvent;

public interface EventHandler<T extends BaseEvent> {

    boolean supports(BaseEvent event);

    void handle(T event);
}
