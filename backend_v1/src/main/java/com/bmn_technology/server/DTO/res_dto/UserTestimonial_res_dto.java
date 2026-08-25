package com.bmn_technology.server.DTO.res_dto;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
public class UserTestimonial_res_dto {
    
    private Long id;
    private String userName;
    private String company;
    private String position;
    private String email;
    private String testimonial;
    private int rating;
    private LocalDateTime createdAt;
    private boolean isAvailable;
}
