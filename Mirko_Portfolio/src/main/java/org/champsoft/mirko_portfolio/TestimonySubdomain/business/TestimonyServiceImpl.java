package org.champsoft.mirko_portfolio.TestimonySubdomain.business;

import org.champsoft.mirko_portfolio.TestimonySubdomain.data.TestimonyRepository;
import org.champsoft.mirko_portfolio.TestimonySubdomain.data.Testimony;
import org.champsoft.mirko_portfolio.TestimonySubdomain.data.Status;
import org.champsoft.mirko_portfolio.TestimonySubdomain.presentation.TestimonyRequestDTO;
import org.champsoft.mirko_portfolio.TestimonySubdomain.presentation.TestimonyResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TestimonyServiceImpl implements TestimonyService {

    private final TestimonyRepository repo;

    @Autowired
    public TestimonyServiceImpl(TestimonyRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Testimony> getAll() {
        return repo.findAll();
    }

    @Override
    public Testimony getTestimonyById(Long userId) {
        return repo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Testimony not found"));
    }

    @Override
    public TestimonyResponseDTO updateTestimony(Long userId, TestimonyRequestDTO dto) {

        Testimony testimony = repo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Testimony not found with id: " + userId
                ));

        testimony.setFirstName(dto.getFirstName());
        testimony.setLastName(dto.getLastName());
        testimony.setComment(dto.getComment());
        testimony.setRating(dto.getRating());

        // Optional: allow updating status from DTO
        if (dto.getStatus() != null) {
            testimony.setStatus(dto.getStatus());
        }

        Testimony updatedTestimony = repo.save(testimony);

        return new TestimonyResponseDTO(
                updatedTestimony.getId(),
                updatedTestimony.getUserId(),
                updatedTestimony.getFirstName(),
                updatedTestimony.getLastName(),
                updatedTestimony.getComment(),
                updatedTestimony.getRating(),
                updatedTestimony.getCreatedAt(),
                updatedTestimony.getStatus()
        );
    }

    @Override
    public TestimonyResponseDTO createTestimony(TestimonyRequestDTO dto) {
        if (dto == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Testimony request must not be null");
        }

        Testimony testimony = new Testimony();
        testimony.setUserId("placeholder-user"); // TEMP FIX
        testimony.setFirstName(dto.getFirstName());
        testimony.setLastName(dto.getLastName());
        testimony.setComment(dto.getComment());
        testimony.setRating(dto.getRating());
        testimony.setCreatedAt(LocalDateTime.now());

        // ✅ Use Enum instead of Boolean
        testimony.setStatus(Status.PENDING); // default status

        Testimony savedTestimony = repo.save(testimony);

        return new TestimonyResponseDTO(
                savedTestimony.getId(),
                savedTestimony.getUserId(),
                savedTestimony.getFirstName(),
                savedTestimony.getLastName(),
                savedTestimony.getComment(),
                savedTestimony.getRating(),
                savedTestimony.getCreatedAt(),
                savedTestimony.getStatus()
        );
    }

    @Override
    public void deleteTestimony(Long userId) {

        Testimony testimony = repo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Testimony not found with id: " + userId
                ));

        repo.delete(testimony);
    }
}
