package org.champsoft.mirko_portfolio.projectsubdomain.presentation;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponseDTO {

    private Long id;

    private String projectId;

    private String name;

    private String description;



}
