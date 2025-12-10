package appz.lab.lib.logservice.services;

import java.util.List;

public interface LogService {

    void saveLogs(String serviceName, List<String> logs);

    List<String> getLogs(String serviceName);
}
