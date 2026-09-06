package com.bmn_technology.server.DTO.res_dto;

import java.time.LocalDateTime;

import com.bmn_technology.server.enums.ElectricityBillRange;
import com.bmn_technology.server.enums.InterestedSolution;
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
public class UserSolarAssessment_res_dto {

    private Long id;
    private String userName;
    private String phoneNumber;
    private String email;
    private String location;
    private PropertyType propertyType;
    private Integer monthlyElectricityBill;
    private InterestedSolution interestedSolution;
    private String message;
    private boolean isRead;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}