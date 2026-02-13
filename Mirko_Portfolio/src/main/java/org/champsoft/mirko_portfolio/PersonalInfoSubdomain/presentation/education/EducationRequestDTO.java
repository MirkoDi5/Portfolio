package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EducationRequestDTO {

    private String educationId;

    private String schoolName;

    private String program;

    private String time;

}
