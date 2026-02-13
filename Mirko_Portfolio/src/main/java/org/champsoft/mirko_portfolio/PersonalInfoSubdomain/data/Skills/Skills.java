package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "skills")
public class Skills {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // auto-generated primary key

    @Column(name = "skill_id")
    private String skillId;

    @Column(name = "name")
    private String name;

    @Column(name = "level")
    private String level;
    }

