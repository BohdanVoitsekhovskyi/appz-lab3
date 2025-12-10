package appz.lab.lib.logservice.controller;

import appz.lab.lib.logservice.services.LogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequestMapping("/logs")
public class LogController {

    private final LogService logService;

    @GetMapping("/{serviceName}")
    public List<String> getLogs(@PathVariable String serviceName) {
        return logService.getLogs(serviceName);
    }

}
