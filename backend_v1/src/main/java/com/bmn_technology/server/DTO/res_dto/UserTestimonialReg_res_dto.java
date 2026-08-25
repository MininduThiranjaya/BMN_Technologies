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
public class UserTestimonialReg_res_dto {
    
    private String userName;
    private String company;
    private String position;
    private String email;
    private String testimonial;
    private int rating;
}
