package custom.logger.starter.appender;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.AppenderBase;

import custom.logger.starter.event.LogListOverloadEvent;
import custom.logger.starter.properties.LoggingProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RequiredArgsConstructor
public class InMemoryLogAppender extends AppenderBase<ILoggingEvent> {

    private final List<ILoggingEvent> logEvents = new CopyOnWriteArrayList<>();
    private final LoggingProperties loggingProperties;
    private final ApplicationEventPublisher publisher;

    @Override
    protected void append(ILoggingEvent eventObject) {
        logEvents.add(eventObject);

        if (logEvents.size() >= loggingProperties.getMaxLogEvents()) {
            publisher.publishEvent(new LogListOverloadEvent(this));
        }
    }

    public List<String> drainAll() {
        List<ILoggingEvent> copy = new ArrayList<>(logEvents);
        logEvents.clear();
        return copy.stream().map(ILoggingEvent::toString).toList();
    }
}

