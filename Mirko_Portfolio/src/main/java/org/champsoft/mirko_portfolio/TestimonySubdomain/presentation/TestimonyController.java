package org.champsoft.mirko_portfolio.TestimonySubdomain.presentation;

import jakarta.validation.Valid;
import org.champsoft.mirko_portfolio.TestimonySubdomain.business.TestimonyService;
import org.champsoft.mirko_portfolio.TestimonySubdomain.data.Testimony;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/testimony")
@CrossOrigin(origins = "http://localhost:3000")
public class TestimonyController {

    private final TestimonyService service;

    public TestimonyController(TestimonyService service) {
        this.service = service;
    }

    // 🔐 GET ALL
    @GetMapping
    public ResponseEntity<List<Testimony>> getAll(

    ) {
        return ResponseEntity.ok(service.getAll());
    }

    // 🔐 GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Testimony> getTestimonyById(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ResponseEntity.ok(service.getTestimonyById(id));
    }

    // 🔐 CREATE
    @PostMapping
    public ResponseEntity<TestimonyResponseDTO> createTestimony(
            @Valid @RequestBody TestimonyRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        TestimonyResponseDTO created = service.createTestimony(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 🔐 UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<TestimonyResponseDTO> updateTestimony(
            @PathVariable Long id,
            @Valid @RequestBody TestimonyRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        TestimonyResponseDTO updated = service.updateTestimony(id, dto);
        return ResponseEntity.ok(updated);
    }

    // 🔐 DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestimony(
            @PathVariable Long id,
            @AuthenticationPrincipal Jwt jwt
    ) {
        service.deleteTestimony(id);
        return ResponseEntity.noContent().build();
    }
}
