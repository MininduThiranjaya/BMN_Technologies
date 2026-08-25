package com.bmn_technology.server.DTO.res_dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.bmn_technology.server.enums.ProjectCategory;
import com.bmn_technology.server.enums.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullProject_res_dto {

    private Long id;
    private String projectId;
    private String projectName;
    private String personName;
    private String province;
    private String location;
    private String projectDescription;
    private ProjectCategory category;
    private PropertyType propertyType;
    private LocalDate projectDate;
    private List<ProjectImage_res_dto> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}