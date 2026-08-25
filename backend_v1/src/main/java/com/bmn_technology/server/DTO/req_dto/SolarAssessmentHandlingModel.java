package com.bmn_technology.server.DTO.req_dto;

import com.bmn_technology.server.enums.ContactMethod;
import com.bmn_technology.server.enums.SolarAssessmentHandlingStatus;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolarAssessmentHandlingModel {

    @NotNull
    private Long solarAssessmentId;

    @NotNull
    private Long adminId;

    @NotNull
    private ContactMethod contactMethod;

    @NotNull
    private SolarAssessmentHandlingStatus status;

    @Size(max = 2000)
    private String note;
}