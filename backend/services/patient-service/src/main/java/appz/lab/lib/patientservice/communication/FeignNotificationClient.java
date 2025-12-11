package appz.lab.lib.patientservice.communication;

import appz.lab.common.lib.notification.BaseEvent;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service")
public interface FeignNotificationClient {

    @PostMapping("/api/notifications/triger")
    void triggerNotification(@RequestBody BaseEvent event);
}
