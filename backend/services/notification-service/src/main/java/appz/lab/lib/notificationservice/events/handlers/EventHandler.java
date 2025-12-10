package appz.lab.lib.notificationservice.events.handlers;


import appz.lab.common.lib.notification.BaseEvent;

public interface EventHandler<T extends BaseEvent> {

    boolean supports(BaseEvent event);

    void handle(T event);
}
