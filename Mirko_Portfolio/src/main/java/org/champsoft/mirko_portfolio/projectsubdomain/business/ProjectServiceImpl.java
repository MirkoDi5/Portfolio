package org.champsoft.mirko_portfolio.projectsubdomain.business;

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

                Projects updatedProjects = repo.save(project);

                return new ProjectResponseDTO(
                        updatedProjects.getId(),
                        updatedProjects.getProjectId(),
                        updatedProjects.getName(),
                        updatedProjects.getDescription()


                );

    }

}
