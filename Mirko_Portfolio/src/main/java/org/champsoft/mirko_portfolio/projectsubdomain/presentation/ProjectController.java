package org.champsoft.mirko_portfolio.projectsubdomain.presentation;

import jakarta.validation.Valid;
import org.champsoft.mirko_portfolio.projectsubdomain.business.ProjectService;
import org.champsoft.mirko_portfolio.projectsubdomain.data.Projects;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    // 🔐 JWT required
    @GetMapping("")
    public ResponseEntity<List<Projects>> getAllProjects(

    ) {
        return ResponseEntity.ok(service.getAll());
    }

    // 🔐 JWT required
    @GetMapping("/{projectId}")
    public ResponseEntity<Projects> getProjectById(
            @PathVariable String projectId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ResponseEntity.ok(service.getProjectById(projectId));
    }

    // 🔐 JWT required
    @PostMapping("")
    public ResponseEntity<ProjectResponseDTO> createProject(
            @Valid @RequestBody ProjectRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional: Auth0 user ID
        ProjectResponseDTO created = service.createProject(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 🔐 JWT required
    @PutMapping("/{projectId}")
    public ResponseEntity<ProjectResponseDTO> updateProject(
            @PathVariable String projectId,
            @Valid @RequestBody ProjectRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional
        ProjectResponseDTO updated = service.updateProject(projectId, dto);
        return ResponseEntity.ok(updated);
    }

    // 🔐 JWT required
    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(
            @PathVariable String projectId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional
        service.deleteProject(projectId);
        return ResponseEntity.noContent().build();
    }
}
