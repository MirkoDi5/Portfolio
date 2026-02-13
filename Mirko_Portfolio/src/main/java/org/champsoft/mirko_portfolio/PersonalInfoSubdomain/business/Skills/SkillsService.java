package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.Skills;

import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.Skills;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsResponseDTO;

import java.util.List;

public interface SkillsService {

    List<Skills> getAll();
    Skills getSkillById(String skillId);
    SkillsResponseDTO updateSkill(String skillId, SkillsRequestDTO dto);
    SkillsResponseDTO createSkill(SkillsRequestDTO dto);
    void deleteSkill(String skillId);

}
