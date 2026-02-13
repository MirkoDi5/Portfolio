package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.Work;

import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.Skills.SkillsService;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.SkillsRepository;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.Skills;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Work.Work;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Work.WorkRepository;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills.SkillsResponseDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Work.WorkRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Work.WorkResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class WorkServiceImpl implements WorkService {



    private final WorkRepository repo;

    @Autowired
    public WorkServiceImpl(WorkRepository repo) {


        this.repo = repo;

    }

    @Override
    public List<Work> getAll() {

        return repo.findAll();
    }

    @Override
    public Work getWorkById(String workId) {
        return repo.findById(workId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }


    @Override
    public WorkResponseDTO updateWork(String workId, WorkRequestDTO dto) {

        Work project = repo.findById(workId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer not found with id: " + workId
                ));


        project.setWorkId(dto.getWorkId());
        project.setName(dto.getName());
        project.setWorkName(dto.getWorkName());
        project.setTime(dto.getTime());
        project.setDescription(dto.getDescription());

        Work updatedProjects = repo.save(project);

        return new WorkResponseDTO(
                updatedProjects.getId(),
                updatedProjects.getWorkId(),
                updatedProjects.getName(),
                updatedProjects.getWorkName(),
                updatedProjects.getTime(),
                updatedProjects.getDescription()



        );

    }

    @Override
    public WorkResponseDTO createWork(WorkRequestDTO dto) {

        if (dto == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Work request must not be null"
            );
        }

        Work work = new Work();
        work.setWorkId(dto.getWorkId());
        work.setName(dto.getName());
        work.setWorkName(dto.getWorkName());
        work.setTime(dto.getTime());
        work.setDescription(dto.getDescription());

        Work savedWork = repo.save(work);

        return new WorkResponseDTO(
                savedWork.getId(),
                savedWork.getWorkId(),
                savedWork.getName(),
                savedWork.getWorkName(),
                savedWork.getTime(),
                savedWork.getDescription()
        );
    }


    @Override
    public void deleteWork(String workId) {

        Work work = repo.findById(workId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Work not found with id: " + workId
                ));

        repo.delete(work);
    }



}
