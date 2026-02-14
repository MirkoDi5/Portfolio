package org.champsoft.mirko_portfolio.ContactsSubdomain.presentation;

import jakarta.validation.Valid;
import org.champsoft.mirko_portfolio.ContactsSubdomain.business.ContactsService;
import org.champsoft.mirko_portfolio.ContactsSubdomain.data.Contacts;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/contacts")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactsController {

    private final ContactsService service;

    public ContactsController(ContactsService service) {
        this.service = service;
    }

    // 🔐 JWT required
    @GetMapping
    public ResponseEntity<List<Contacts>> getAllContacts(
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ResponseEntity.ok(service.getAllContacts());
    }

    // 🔐 JWT required
    @GetMapping("/{contactId}")
    public ResponseEntity<Contacts> getContactById(
            @PathVariable String contactId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        return ResponseEntity.ok(service.getContactById(contactId));
    }

    // 🔐 JWT required
    @PostMapping
    public ResponseEntity<ContactsResponseDTO> createContact(
            @Valid @RequestBody ContactsRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject(); // Auth0 user ID if needed
        ContactsResponseDTO created = service.createContact(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // 🔐 JWT required
    @PutMapping("/{contactId}")
    public ResponseEntity<ContactsResponseDTO> updateContact(
            @PathVariable String contactId,
            @Valid @RequestBody ContactsRequestDTO dto,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        ContactsResponseDTO updated = service.updateContact(contactId, dto);
        return ResponseEntity.ok(updated);
    }

    // 🔐 JWT required
    @DeleteMapping("/{contactId}")
    public ResponseEntity<Void> deleteContact(
            @PathVariable String contactId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        String userId = jwt.getSubject();
        service.deleteContact(contactId);
        return ResponseEntity.noContent().build();
    }
}
