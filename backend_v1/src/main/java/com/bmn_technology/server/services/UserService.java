package com.bmn_technology.server.services;

import java.util.*;

import org.springframework.stereotype.Service;

import com.bmn_technology.server.DTO.req_dto.UserSolarAssessment_req_dto;
import com.bmn_technology.server.DTO.req_dto.UserTestimonialReg_req_dto;
import com.bmn_technology.server.DTO.res_dto.UserSolarAssessment_res_dto;
import com.bmn_technology.server.DTO.res_dto.UserTestimonialReg_res_dto;
import com.bmn_technology.server.repos.SolarAssessmentRepo;
import com.bmn_technology.server.repos.UserTestimonialRepo;
import com.bmn_technology.server.models.SolarAssessment;
import com.bmn_technology.server.models.UserTestimonialModel;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserTestimonialRepo testimonialRepo;
    private final SolarAssessmentRepo solarAssessmentRepo;
    
    public UserTestimonialReg_res_dto submitUserTestimonialService(UserTestimonialReg_req_dto data) {
        
        UserTestimonialModel testimonial = UserTestimonialModel.builder()
            .userName(data.getUserName())
            .company(data.getCompany())
            .position(data.getPosition())
            .email(data.getEmail())
            .testimonial(data.getTestimonial())
            .rating(data.getRating())
            .build();
        testimonialRepo.save(testimonial);
        return UserTestimonialReg_res_dto.builder()
            .userName(testimonial.getUserName())
            .company(testimonial.getCompany())
            .position(testimonial.getPosition())
            .email(testimonial.getEmail())
            .testimonial(testimonial.getTestimonial())
            .rating(testimonial.getRating())
            .build();
    }

    public List<UserTestimonialReg_res_dto> getTopFiveUserTestimonialService() {

        List<UserTestimonialReg_res_dto> topFiveTestimonials = testimonialRepo.findTop5ByIsAvailableTrueOrderByCreatedAtDesc()
            .stream()
                .map(testimonial -> 
                    UserTestimonialReg_res_dto.builder()
                        .userName(testimonial.getUserName())
                        .company(testimonial.getCompany())
                        .position(testimonial.getPosition())
                        .email(testimonial.getEmail())
                        .testimonial(testimonial.getTestimonial())
                        .rating(testimonial.getRating())
                        .build()
                ).toList();
        return topFiveTestimonials;
    }

    public UserSolarAssessment_res_dto submitUserSolarAssessmentService(UserSolarAssessment_req_dto data) {
        
        SolarAssessment assessment = SolarAssessment.builder()
            .userName(data.getUserName())
            .phoneNumber(data.getPhoneNumber())
            .email(data.getEmail())
            .location(data.getLocation())
            .propertyType(data.getPropertyType())
            .monthlyElectricityBill(data.getMonthlyElectricityBill())
            .interestedSolution(data.getInterestedSolution())
            .message(data.getMessage())
            .build();
        SolarAssessment savedAssessment = solarAssessmentRepo.save(assessment);
        return UserSolarAssessment_res_dto.builder()
            .id(savedAssessment.getId())
            .userName(savedAssessment.getUserName())
            .phoneNumber(savedAssessment.getPhoneNumber())
            .email(savedAssessment.getEmail())
            .location(savedAssessment.getLocation())
            .propertyType(savedAssessment.getPropertyType())
            .monthlyElectricityBill(savedAssessment.getMonthlyElectricityBill())
            .interestedSolution(savedAssessment.getInterestedSolution())
            .message(savedAssessment.getMessage())
            .isRead(savedAssessment.isRead())
            .createdAt(savedAssessment.getCreatedAt())
            .updatedAt(savedAssessment.getUpdatedAt())
            .build();
    }
}
