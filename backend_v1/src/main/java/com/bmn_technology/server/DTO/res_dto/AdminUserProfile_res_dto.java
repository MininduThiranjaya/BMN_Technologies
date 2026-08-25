package com.bmn_technology.server.DTO.res_dto;

import java.time.LocalDateTime;

import com.bmn_technology.server.enums.AdminRoles;

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
public class AdminUserProfile_res_dto {
    
    private String userName;
    private String email;
    private String phoneNumber;
    private AdminRoles role;
    private boolean isSuspended;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}