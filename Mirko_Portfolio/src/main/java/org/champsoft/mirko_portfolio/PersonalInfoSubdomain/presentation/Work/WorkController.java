package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Work;

import jakarta.validation.Valid;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.Work.WorkService;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Work.Work;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/work")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkController {

    private final WorkService service;

    public WorkController(WorkService service) {
        this.service = service;
    }

    // 🔐 JWT required
    @GetMapping("")
    public ResponseEntity<List<Work>> getAllWork(

    ) {
        return ResponseEntity.ok(service.getAll());
    }

    // 🔐 JWT required
    @GetMapping("/{workId}")
    public ResponseEntity<Work> getWorkById(
            @PathVariable String workId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ResponseEntity.ok(service.getWorkById(workId));
    }

    // 🔐 JWT required
    @PostMapping("")
    public ResponseEntity<WorkResponseDTO> createWork(
            @Valid @RequestBody WorkRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional: Auth0 user ID
        WorkResponseDTO created = service.createWork(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 🔐 JWT required
    @PutMapping("/{workId}")
    public ResponseEntity<WorkResponseDTO> updateWork(
            @PathVariable String workId,
            @Valid @RequestBody WorkRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional
        WorkResponseDTO updated = service.updateWork(workId, dto);
        return ResponseEntity.ok(updated);
    }

    // 🔐 JWT required
    @DeleteMapping("/{workId}")
    public ResponseEntity<Void> deleteWork(
            @PathVariable String workId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional
        service.deleteWork(workId);
        return ResponseEntity.noContent().build();
    }
}
