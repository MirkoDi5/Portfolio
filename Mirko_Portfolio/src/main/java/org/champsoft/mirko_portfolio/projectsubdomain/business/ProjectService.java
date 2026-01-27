package org.champsoft.mirko_portfolio.projectsubdomain.business;

import org.champsoft.mirko_portfolio.projectsubdomain.data.Projects;
import org.champsoft.mirko_portfolio.projectsubdomain.presentation.ProjectRequestDTO;
import org.champsoft.mirko_portfolio.projectsubdomain.presentation.ProjectResponseDTO;

import java.util.List;

public interface ProjectService {

    List<Projects> getAll();
    Projects getProjectById(String projectId);
    ProjectResponseDTO updateProject(String projectId, ProjectRequestDTO dto);
}
