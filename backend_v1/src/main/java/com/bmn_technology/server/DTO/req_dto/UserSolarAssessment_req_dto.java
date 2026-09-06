package com.bmn_technology.server.DTO.req_dto;

import com.bmn_technology.server.enums.ElectricityBillRange;
import com.bmn_technology.server.enums.InterestedSolution;
import com.bmn_technology.server.enums.PropertyType;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
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
public class UserSolarAssessment_req_dto {

    @NotBlank(message = "User name is required")
    @Size(max = 100, message = "User name must not exceed 100 characters")
    private String userName;

    @NotBlank(message = "Phone number is required")
    @Size(max = 20, message = "Phone number must not exceed 20 characters")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    @NotBlank(message = "Location is required")
    @Size(max = 150, message = "Location must not exceed 150 characters")
    private String location;

    @NotNull(message = "Property type is required")
    private PropertyType propertyType;

    @Min(value = 0, message = "Monthly electricity bill cannot be negative")
    private Integer monthlyElectricityBill;

    @NotNull(message = "Interested solution is required")
    private InterestedSolution interestedSolution;

    private String message;
}