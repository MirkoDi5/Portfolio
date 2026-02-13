package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.education;

import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.Skills;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.SkillsRepository;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.education.Education;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.education.EducationRepository;
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
public class EducationServiceImpl implements EducationService {



    private final EducationRepository repo;

    @Autowired
    public EducationServiceImpl(EducationRepository repo) {


        this.repo = repo;

    }

@Override
    public List<Education> getAll() {

        return repo.findAll();
    }

    @Override
    public Education getEducationById(String educationId) {
        return repo.findById(educationId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }


    @Override
    public EducationResponseDTO updateEducation(String educationId, EducationRequestDTO dto) {

        Education project = repo.findById(educationId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer not found with id: " + educationId
                ));


                project.setEducationId(dto.getEducationId());
                project.setSchoolName(dto.getSchoolName());
                project.setProgram(dto.getProgram());
                project.setTime(dto.getTime());

                Education updatedProjects = repo.save(project);

                return new EducationResponseDTO(
                        updatedProjects.getId(),
                        updatedProjects.getEducationId(),
                        updatedProjects.getSchoolName(),
                        updatedProjects.getProgram(),
                        updatedProjects.getTime()


                );

    }

    @Override
    public EducationResponseDTO createEducation(EducationRequestDTO dto) {

        if (dto == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Education request must not be null"
            );
        }

        Education education = new Education();
        education.setEducationId(dto.getEducationId());
        education.setSchoolName(dto.getSchoolName());
        education.setProgram(dto.getProgram());
        education.setTime(dto.getTime());

        Education savedEducation = repo.save(education);

        return new EducationResponseDTO(
                savedEducation.getId(),
                savedEducation.getEducationId(),
                savedEducation.getSchoolName(),
                savedEducation.getProgram(),
                savedEducation.getTime()
        );
    }


    @Override
    public void deleteEducation(String educationId) {

        Education education = repo.findById(educationId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Education not found with id: " + educationId
                ));

        repo.delete(education);
    }



}
