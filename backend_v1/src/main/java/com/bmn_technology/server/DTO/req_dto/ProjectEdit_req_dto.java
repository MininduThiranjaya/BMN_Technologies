package com.bmn_technology.server.DTO.req_dto;

import java.time.LocalDate;
import java.util.List;

import com.bmn_technology.server.enums.ProjectCategory;
import com.bmn_technology.server.enums.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectEdit_req_dto {
 
    private String projectName;
    private String personName;
    private String province;
    private String location;
    private ProjectCategory category;
    private PropertyType propertyType;
    private LocalDate projectDate;
    private String projectDescription;
    private String imageOperations;
    private List<MultipartFile> images;
}
