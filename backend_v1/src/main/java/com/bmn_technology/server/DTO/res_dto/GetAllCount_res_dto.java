package com.bmn_technology.server.DTO.res_dto;

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
public class GetAllCount_res_dto {
    
    long adminUserCount;
    long productCount;
    long projectCount;
    long testimonialCount;
    long userSolarAssessmentCount;
}
