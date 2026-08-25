package com.bmn_technology.server.controllers;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bmn_technology.server.DTO.ApiResponse;
import com.bmn_technology.server.DTO.req_dto.UserSolarAssessment_req_dto;
import com.bmn_technology.server.DTO.req_dto.UserTestimonialReg_req_dto;
import com.bmn_technology.server.DTO.res_dto.UserSolarAssessment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserTestimonialReg_res_dto;
import com.bmn_technology.server.services.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("bmn_tech/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @PostMapping("testimonial/submit")
    public ResponseEntity<ApiResponse> submitTestimonialCommentController(@Valid @RequestBody UserTestimonialReg_req_dto data) {
        
        UserTestimonialReg_res_dto res = service.submitUserTestimonialService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User deleted successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("testimonial/get-top-five")
    public ResponseEntity<ApiResponse> getTopFiveUserTestimonialController() {
        
        List<UserTestimonialReg_res_dto> res = service.getTopFiveUserTestimonialService();
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User deleted successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("solar-assessment/submit")
    public ResponseEntity<ApiResponse> submitUserSolarAssessmentController(@Valid @RequestBody UserSolarAssessment_req_dto data) {
        
        UserSolarAssessment_res_dto res =  service.submitUserSolarAssessmentService(data);
        ApiResponse response = ApiResponse.builder()
            .success(true)
            .message("User deleted successfully")
            .data(res)
            .build();
        return ResponseEntity.ok(response);
    }
}
