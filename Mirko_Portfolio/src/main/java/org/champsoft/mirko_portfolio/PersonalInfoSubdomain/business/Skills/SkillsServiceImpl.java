package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.Skills;

import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.SkillsRepository;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.Skills;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.education.Education;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsResponseDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education.EducationRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education.EducationResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SkillsServiceImpl implements SkillsService {



    private final SkillsRepository repo;

    @Autowired
    public SkillsServiceImpl(SkillsRepository repo) {


        this.repo = repo;

    }

@Override
    public List<Skills> getAll() {

        return repo.findAll();
    }

    @Override
    public Skills getSkillById(String skillId) {
        return repo.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }


    @Override
    public SkillsResponseDTO updateSkill(String skillId, SkillsRequestDTO dto) {

        Skills project = repo.findById(skillId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer not found with id: " + skillId
                ));


                project.setSkillId(dto.getSkillId());
                project.setName(dto.getName());
                project.setLevel(dto.getLevel());

                Skills updatedProjects = repo.save(project);

                return new SkillsResponseDTO(
                        updatedProjects.getId(),
                        updatedProjects.getSkillId(),
                        updatedProjects.getName(),
                        updatedProjects.getLevel()


                );

    }

    @Override
    public SkillsResponseDTO createSkill(SkillsRequestDTO dto) {

        if (dto == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Skill request must not be null"
            );
        }

        Skills skill = new Skills();
        skill.setSkillId(dto.getSkillId());
        skill.setName(dto.getName());
        skill.setLevel(dto.getLevel());

        Skills savedSkill = repo.save(skill);

        return new SkillsResponseDTO(
                savedSkill.getId(),
                savedSkill.getSkillId(),
                savedSkill.getName(),
                savedSkill.getLevel()
        );
    }

    @Override
    public void deleteSkill(String skillId) {

        Skills skill = repo.findById(skillId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Skill not found with id: " + skillId
                ));

        repo.delete(skill);
    }


}
