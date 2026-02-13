package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.Work;

import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.Skills;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Work.Work;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsResponseDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Work.WorkRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Work.WorkResponseDTO;

import java.util.List;

public interface WorkService {

    List<Work> getAll();
    Work getWorkById(String workId);
    WorkResponseDTO updateWork(String workId, WorkRequestDTO dto);
    WorkResponseDTO createWork(WorkRequestDTO dto);
    void deleteWork(String workId);

}
