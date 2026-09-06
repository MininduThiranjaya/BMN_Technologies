package com.bmn_technology.server.controllers;

import java.util.*;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.bmn_technology.server.services.AdminService;
import com.bmn_technology.server.services.auth.AdminUserDetails;
import com.bmn_technology.server.DTO.req_dto.AdminReg_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProductCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.ProjectCreate_req_dto;
import com.bmn_technology.server.DTO.req_dto.SolarAssessmentAssignment_req_dto;
import com.bmn_technology.server.DTO.ApiResponse;
import com.bmn_technology.server.DTO.req_dto.AdminChangePassword_req_dto;
import com.bmn_technology.server.DTO.req_dto.AdminLogin_req_dto;
import com.bmn_technology.server.DTO.res_dto.AdminLogin_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminReg_res_dto;
import com.bmn_technology.server.DTO.res_dto.AdminUserProfile_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullAdminDetails_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullProduct_res_dto;
import com.bmn_technology.server.DTO.res_dto.FullProject_res_dto;
import com.bmn_technology.server.DTO.res_dto.GetAllCount_res_dto;
import com.bmn_technology.server.DTO.res_dto.Page_res_dto;
import com.bmn_technology.server.DTO.res_dto.SolarAssessmentAssignment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserSolarAssessment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserTestimonial_res_dto;
import com.bmn_technology.server.models.ProductModel;
import com.bmn_technology.server.models.ProjectModel;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import com.bmn_technology.server.services.CommonService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("bmn_tech/api/common")
@RequiredArgsConstructor
public class CommonController {

    private final CommonService service;

    @GetMapping("product/get-all")
    public ResponseEntity<ApiResponse> getProductController(
        @RequestParam(defaultValue = "0")
        int page,
        @RequestParam(defaultValue = "12")
        int size,
        @RequestParam(defaultValue = "createdAt")
        String sortBy,
        @RequestParam(defaultValue = "desc")
        String direction
    ) {
        
        Page_res_dto<FullProduct_res_dto> res =
                service.getProductService(
                        page,
                        size,
                        sortBy,
                        direction
                );
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Get product successfully page = " + page)
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("project/get-all")
    public ResponseEntity<ApiResponse> getProjectsController(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "createdAt") String sortBy,
        @RequestParam(defaultValue = "desc") String direction
    ) {

        Page_res_dto<FullProject_res_dto> res =
                service.getProjectService(
                        page,
                        size,
                        sortBy,
                        direction
                );
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("Get product successfully page = " + page)
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }
}

