package com.bmn_technology.server.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_testimonial")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTestimonialModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false, length = 100)
    private String userName;

    @Column(name = "company", nullable = true, length = 100)
    private String company;

    @Column(name = "position", nullable = true, length = 100)
    private String position;

    @Column(name = "email", nullable = true, length = 150)
    private String email;

    @Column(name = "testimonial", nullable = false, columnDefinition = "TEXT")
    private String testimonial;

    @Column(name = "rating", nullable = false)
    private int rating;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Builder.Default
    @Column(name = "is_available", nullable = false, columnDefinition = "BOOLEAN DEFAULT TRUE")
    private boolean isAvailable = true;
}