package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Work;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "works")
public class Work {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // auto-generated primary key

    @Column(name = "work_id")
    private String workId;

    @Column(name = "name")
    private String name;

    @Column(name = "work_name")
    private String workName;

    @Column(name = "time")
    private String time;

    @Column(name = "description")
    private String description;
}

