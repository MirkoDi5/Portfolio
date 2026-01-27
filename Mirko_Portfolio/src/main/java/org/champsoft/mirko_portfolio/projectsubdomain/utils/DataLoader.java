package org.champsoft.mirko_portfolio.projectsubdomain.utils;

import org.champsoft.mirko_portfolio.projectsubdomain.data.ProjectRepository;
import org.champsoft.mirko_portfolio.projectsubdomain.data.Projects;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProjectRepository repo;

    public DataLoader(ProjectRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        // Only add sample data if table is empty
        if (repo.count() == 0) {
            repo.save(new Projects("76544", "ECP", "Portfolio project"));
            repo.save(new Projects("76545", "Website", "Personal website project"));
            repo.save(new Projects("7654", "API", "Spring Boot API project"));

            System.out.println("Sample projects inserted!");
        }
    }
}
