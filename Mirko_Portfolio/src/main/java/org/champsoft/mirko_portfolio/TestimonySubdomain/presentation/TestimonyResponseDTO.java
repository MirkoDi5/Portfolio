package org.champsoft.mirko_portfolio.TestimonySubdomain.presentation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.champsoft.mirko_portfolio.TestimonySubdomain.data.Status;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestimonyResponseDTO {

    private Long id;

    private String userId;

    private String firstName;

    private String lastName;

    private String comment;

    private Integer rating;

    private LocalDateTime createdAt;

    private Status status;
}
