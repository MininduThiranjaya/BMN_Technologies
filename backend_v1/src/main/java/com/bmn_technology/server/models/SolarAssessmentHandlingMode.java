package com.bmn_technology.server.models;

import com.bmn_technology.server.enums.ContactMethod;
import com.bmn_technology.server.enums.SolarAssessmentHandlingStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "solar_assessment_handling")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolarAssessmentHandlingMode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "solar_assessment_id",
            nullable = false
    )
    private SolarAssessment solarAssessment;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "admin_id",
            nullable = false
    )
    private AdminModel admin;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "contact_method",
            nullable = false,
            length = 30
    )
    private ContactMethod contactMethod;

    @Enumerated(EnumType.STRING)
    @Column(
            name = "status",
            nullable = false,
            length = 30
    )
    private SolarAssessmentHandlingStatus status;

    @Column(
            name = "note",
            columnDefinition = "TEXT"
    )
    private String note;

    @CreationTimestamp
    @Column(
            name = "created_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;
}