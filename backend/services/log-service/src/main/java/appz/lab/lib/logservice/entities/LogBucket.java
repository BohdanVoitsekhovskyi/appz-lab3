package appz.lab.lib.logservice.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "log_buckets")
@Getter
@Setter
@AllArgsConstructor
public class LogBucket {
    @Id
    private String serviceName;
    private List<String> logs;

    public void appendLogs(List<String> newLogs) {
        this.logs.addAll(newLogs);
    }
}
