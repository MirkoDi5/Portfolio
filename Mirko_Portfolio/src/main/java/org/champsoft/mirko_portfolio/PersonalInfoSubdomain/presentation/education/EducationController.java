package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.education;

import jakarta.validation.Valid;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.education.EducationService;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.education.Education;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/education")
@CrossOrigin(origins = "http://localhost:3000")
public class EducationController {

    private final EducationService service;

    public EducationController(EducationService service) {
        this.service = service;
    }

    // 🔐 JWT required
    @GetMapping("")
    public ResponseEntity<List<Education>> getAllEducation(

    ) {
        return ResponseEntity.ok(service.getAll());
    }

    // 🔐 JWT required
    @GetMapping("/{educationId}")
    public ResponseEntity<Education> getEducationById(
            @PathVariable String educationId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ResponseEntity.ok(service.getEducationById(educationId));
    }

    // 🔐 JWT required
    @PostMapping("")
    public ResponseEntity<EducationResponseDTO> createEducation(
            @Valid @RequestBody EducationRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Auth0 user ID
        EducationResponseDTO created = service.createEducation(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 🔐 JWT required
    @PutMapping("/{educationId}")
    public ResponseEntity<EducationResponseDTO> updateEducation(
            @PathVariable String educationId,
            @Valid @RequestBody EducationRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        EducationResponseDTO updated = service.updateEducation(educationId, dto);
        return ResponseEntity.ok(updated);
    }

    // 🔐 JWT required
    @DeleteMapping("/{educationId}")
    public ResponseEntity<Void> deleteEducation(
            @PathVariable String educationId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        service.deleteEducation(educationId);
        return ResponseEntity.noContent().build();
    }
}
