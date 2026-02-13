package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.education;

import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.Skills;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.education.Education;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsResponseDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education.EducationRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education.EducationResponseDTO;

import java.util.List;

public interface EducationService {

    List<Education> getAll();
    Education getEducationById(String educationId);
    EducationResponseDTO updateEducation(String educationId, EducationRequestDTO dto);
    EducationResponseDTO createEducation(EducationRequestDTO dto);
    void deleteEducation(String educationId);

}
