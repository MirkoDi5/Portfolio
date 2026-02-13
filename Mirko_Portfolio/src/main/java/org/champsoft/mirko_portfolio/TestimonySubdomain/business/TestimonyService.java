package org.champsoft.mirko_portfolio.TestimonySubdomain.business;

import org.champsoft.mirko_portfolio.TestimonySubdomain.data.Testimony;
import org.champsoft.mirko_portfolio.TestimonySubdomain.presentation.TestimonyRequestDTO;
import org.champsoft.mirko_portfolio.TestimonySubdomain.presentation.TestimonyResponseDTO;

import java.util.List;

public interface TestimonyService {

    List<Testimony> getAll();
    Testimony getTestimonyById(Long userId);
    TestimonyResponseDTO updateTestimony(Long userId, TestimonyRequestDTO dto);
    TestimonyResponseDTO createTestimony(TestimonyRequestDTO dto);
    void deleteTestimony(Long userId);

}
