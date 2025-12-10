package custom.logger.starter.event;

import org.springframework.context.ApplicationEvent;

public class LogListOverloadEvent extends ApplicationEvent {
    public LogListOverloadEvent(Object source) {
        super(source);
    }
}
