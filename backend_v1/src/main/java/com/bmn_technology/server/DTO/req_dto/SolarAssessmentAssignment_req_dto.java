package com.bmn_technology.server.DTO.req_dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolarAssessmentAssignment_req_dto {

    @NotNull
    private Long solarAssessmentId;

    @NotNull
    private Long assignedToAdminId;

    @NotBlank(message = "Note is required")
    @Size(max = 2000)
    private String note;
}