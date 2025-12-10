package appz.lab.lib.logservice.controller;

import appz.lab.lib.logservice.services.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class LogController {

    private final LogService logService;

    @GetMapping("/logs/{serviceName}")
    public List<String> getLogs(@PathVariable String serviceName) {
        return logService.getLogs(serviceName);
    }

}
