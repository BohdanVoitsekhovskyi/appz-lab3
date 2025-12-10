package appz.lab.lib.logservice.models;

import lombok.Data;

import java.util.List;

@Data
public class RequestLogBucket {
    private String serviceName;
    private List<String> logs;
}
