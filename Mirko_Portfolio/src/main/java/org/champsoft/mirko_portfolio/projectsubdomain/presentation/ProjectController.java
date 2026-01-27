package org.champsoft.mirko_portfolio.projectsubdomain.presentation;


import jakarta.validation.Valid;
import org.champsoft.mirko_portfolio.projectsubdomain.business.ProjectService;
import org.champsoft.mirko_portfolio.projectsubdomain.data.Projects;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/projects")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @GetMapping("")
    public ResponseEntity<List<Projects>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Projects> getProjectById(@PathVariable String projectId) {
        return ResponseEntity.ok(service.getProjectById(projectId));
    }

    @PutMapping("{projectId}")
    public ResponseEntity<ProjectResponseDTO> updateProject(
            @PathVariable String projectId,
            @Valid @RequestBody ProjectRequestDTO dto
    ) {
        ProjectResponseDTO updated = service.updateProject(projectId, dto);
        return ResponseEntity.ok(updated);
    }
}
