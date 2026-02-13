package org.champsoft.mirko_portfolio.projectsubdomain.business;

import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.education.Education;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education.EducationRequestDTO;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education.EducationResponseDTO;
import org.champsoft.mirko_portfolio.projectsubdomain.data.ProjectRepository;
import org.champsoft.mirko_portfolio.projectsubdomain.data.Projects;
import org.champsoft.mirko_portfolio.projectsubdomain.presentation.ProjectRequestDTO;
import org.champsoft.mirko_portfolio.projectsubdomain.presentation.ProjectResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {



    private final ProjectRepository repo;

    @Autowired
    public ProjectServiceImpl(ProjectRepository repo) {


        this.repo = repo;

    }

@Override
    public List<Projects> getAll() {

        return repo.findAll();
    }

    @Override
    public Projects getProjectById(String projectId) {
        return repo.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }


    @Override
    public ProjectResponseDTO updateProject(String projectId, ProjectRequestDTO dto) {

        Projects project = repo.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer not found with id: " + projectId
                ));


                project.setProjectId(dto.getProjectId());
                project.setName(dto.getName());
                project.setDescription(dto.getDescription());
                project.setLink(dto.getLink());
                project.setProdLink(dto.getProdLink());


                Projects updatedProjects = repo.save(project);

                return new ProjectResponseDTO(
                        updatedProjects.getId(),
                        updatedProjects.getProjectId(),
                        updatedProjects.getName(),
                        updatedProjects.getDescription(),
                        updatedProjects.getLink(),
                        updatedProjects.getProdLink()


                );

    }


    @Override
    public ProjectResponseDTO createProject(ProjectRequestDTO dto) {

        if (dto == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Project request must not be null"
            );
        }

        Projects project = new Projects();
        project.setProjectId(dto.getProjectId());
        project.setName(dto.getName());
        project.setDescription(dto.getDescription());
        project.setLink(dto.getLink());
        project.setProdLink(dto.getProdLink());


        Projects savedProject = repo.save(project);

        return new ProjectResponseDTO(
                savedProject.getId(),
                savedProject.getProjectId(),
                savedProject.getName(),
                savedProject.getDescription(),
                savedProject.getLink(),
                savedProject.getProdLink()

        );
    }

    @Override
    public void deleteProject(String projectId) {

        Projects project = repo.findById(projectId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Project not found with id: " + projectId
                ));

        repo.delete(project);
    }




}
