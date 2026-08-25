package com.bmn_technology.server.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.bmn_technology.server.enums.ElectricityBillRange;
import com.bmn_technology.server.enums.InterestedSolution;
import com.bmn_technology.server.enums.PropertyType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "solar_assessment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolarAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_name", nullable = false, length = 100)
    private String userName;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "location", nullable = false, length = 150)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(name = "property_type", nullable = false, length = 50)
    private PropertyType propertyType;

    @Enumerated(EnumType.STRING)
    @Column(name = "monthly_ele_bill", nullable = true, length = 50)
    private ElectricityBillRange monthlyElectricityBill;

    @Enumerated(EnumType.STRING)
    @Column(name = "interested_solution", nullable = false, length = 20)
    private InterestedSolution interestedSolution;

    @Column(columnDefinition = "TEXT", nullable = true)
    private String message;

    @Builder.Default
    @Column(name = "is_read", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isRead = false;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false, unique = false)
    private LocalDateTime updatedAt;
}