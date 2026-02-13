package org.champsoft.mirko_portfolio.TestimonySubdomain.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "testimony")
public class Testimony {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private String userId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "comment")
    private String comment;

    @Column(name = "rating")
    private Integer rating;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;


    // ✅ FULL CONSTRUCTOR
    public Testimony(
            String userId,
            String firstName,
            String lastName,
            String comment,
            Integer rating,
            LocalDateTime createdAt,
            Status status
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.comment = comment;
        this.rating = rating;
        this.createdAt = createdAt;
        this.status = status;
    }
}
