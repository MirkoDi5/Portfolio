package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EducationResponseDTO {

    private Long id;

    private String educationId;

    private String schoolName;

    private String program;

    private String time;



}
