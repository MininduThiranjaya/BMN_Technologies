package com.bmn_technology.server.DTO.res_dto;

import java.time.LocalDateTime;

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
public class SolarAssessmentAssignment_res_dto {

    private Long id;
    private Long solarAssessmentId;
    private String solarAssessmentUserName;
    private Long assignedByAdminId;
    private String assignedByAdminUserName;
    private Long assignedToAdminId;
    private String assignedToAdminUserName;
    private boolean isActive;
    private String note;
    private LocalDateTime assignedAt;
}