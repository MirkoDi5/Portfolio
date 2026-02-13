package org.champsoft.mirko_portfolio.TestimonySubdomain.presentation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.champsoft.mirko_portfolio.TestimonySubdomain.data.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestimonyRequestDTO {

    private String firstName;

    private String lastName;

    private String comment;

    private Integer rating;


    private Status status;
}
