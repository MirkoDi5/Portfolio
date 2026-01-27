package org.champsoft.mirko_portfolio.projectsubdomain.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "projects")
public class Projects {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // auto-generated primary key

    @Column(name = "project_id", nullable = false, unique = true)
    private String projectId; // business/project ID

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    // Constructor without id (for inserting new entities)
    public Projects(String projectId, String name, String description) {
        this.projectId = projectId;
        this.name = name;
        this.description = description;
    }
}
