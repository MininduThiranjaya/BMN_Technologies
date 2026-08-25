package com.bmn_technology.server.DTO.res_dto;

import com.bmn_technology.server.enums.AdminRoles;

import lombok.Builder;
import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AdminReg_res_dto {
    
    private String userName;
    private String email;
    private AdminRoles role;
    private String phone;
}
