package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Work;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkRequestDTO {

    private String workId;

    private String name;

    private String workName;

    private String time;

    private String description;


}
