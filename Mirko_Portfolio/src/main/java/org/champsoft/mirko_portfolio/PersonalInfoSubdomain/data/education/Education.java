package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.education;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // auto-generated primary key

    @Column(name = "education_id")
    private String educationId;

    @Column(name = "school_name")
    private String schoolName;

    @Column(name = "program")
    private String program;

    @Column(name = "time")
    private String time;
}

