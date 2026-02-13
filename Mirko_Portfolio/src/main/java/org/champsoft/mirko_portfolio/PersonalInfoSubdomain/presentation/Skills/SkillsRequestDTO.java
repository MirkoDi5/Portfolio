package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SkillsRequestDTO {

    private String skillId;

    private String name;

    private String level;


}
