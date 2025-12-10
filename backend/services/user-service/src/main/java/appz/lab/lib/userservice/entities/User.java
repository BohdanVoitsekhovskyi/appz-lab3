package appz.lab.lib.userservice.entities;


import appz.lab.lib.userservice.models.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String email;

    private String password;

    @Enumerated(EnumType.ORDINAL)
    private UserRole role;

    @Column(nullable = false,name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
}