package com.bmn_technology.server.DTO.req_dto;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.bmn_technology.server.enums.ProjectCategory;
import com.bmn_technology.server.enums.PropertyType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

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
public class ProjectCreate_req_dto {

    @NotBlank(message = "Project ID is required")
    @Size(
        max = 100,
        message = "Project ID must not exceed 100 characters"
    )
    private String projectId;

    @NotBlank(message = "Project name is required")
    @Size(
        max = 200,
        message = "Project name must not exceed 200 characters"
    )
    private String projectName;

    @NotBlank(message = "Person name is required")
    @Size(
        max = 200,
        message = "Person name must not exceed 200 characters"
    )
    private String personName;

    @NotBlank(message = "Province is required")
    @Size(
        max = 100,
        message = "Province must not exceed 100 characters"
    )
    private String province;

    @NotBlank(message = "Location is required")
    @Size(
        max = 255,
        message = "Location must not exceed 255 characters"
    )
    private String location;

    @NotBlank(message = "Project description is required")
    private String projectDescription;

    @NotNull(message = "Project category is required")
    private ProjectCategory category;

    @NotNull(message = "Property type is required")
    private PropertyType propertyType;

    private LocalDate projectDate;

    @NotNull(message = "At least one project image is required")
    @Size(
        min = 1,
        max = 5,
        message = "Project must have between 1 and 5 images"
    )
    private List<MultipartFile> images;
}