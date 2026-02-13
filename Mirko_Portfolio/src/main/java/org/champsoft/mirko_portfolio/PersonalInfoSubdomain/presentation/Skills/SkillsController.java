package org.champsoft.mirko_portfolio.PersonalInfoSubdomain.presentation.Skills;

import jakarta.validation.Valid;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.business.Skills.SkillsService;
import org.champsoft.mirko_portfolio.PersonalInfoSubdomain.data.Skills.Skills;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/skills")
@CrossOrigin(origins = "http://localhost:3000")
public class SkillsController {

    private final SkillsService service;

    public SkillsController(SkillsService service) {
        this.service = service;
    }

    // 🔐 JWT required
    @GetMapping("")
    public ResponseEntity<List<Skills>> getAllSkills(

    ) {
        return ResponseEntity.ok(service.getAll());
    }

    // 🔐 JWT required
    @GetMapping("/{skillId}")
    public ResponseEntity<Skills> getSkillById(
            @PathVariable String skillId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ResponseEntity.ok(service.getSkillById(skillId));
    }

    // 🔐 JWT required
    @PostMapping("")
    public ResponseEntity<SkillsResponseDTO> createSkill(
            @Valid @RequestBody SkillsRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional: Auth0 user ID
        SkillsResponseDTO created = service.createSkill(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 🔐 JWT required
    @PutMapping("/{skillId}")
    public ResponseEntity<SkillsResponseDTO> updateSkill(
            @PathVariable String skillId,
            @Valid @RequestBody SkillsRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional
        SkillsResponseDTO updated = service.updateSkill(skillId, dto);
        return ResponseEntity.ok(updated);
    }

    // 🔐 JWT required
    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> deleteSkill(
            @PathVariable String skillId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Optional
        service.deleteSkill(skillId);
        return ResponseEntity.noContent().build();
    }

}
