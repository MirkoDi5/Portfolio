package org.champsoft.mirko_portfolio.ContactsSubdomain.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "contacts")
public class Contacts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // auto-generated primary key




    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "comment")
    private String comment;





    // Constructor without id (for inserting new entities)
    public Contacts(String name, String lastName ,String email ,String comment) {

        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.comment = comment;


    }
}
