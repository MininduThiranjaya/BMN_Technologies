package com.bmn_technology.server.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "solar_assessment_assignment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SolarAssessmentAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Assessment being assigned
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "solar_assessment_id",
            nullable = false
    )
    private SolarAssessment solarAssessment;

    // Admin who is assigning the assessment
    // Usually the supervisor
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "assigned_by_admin_id",
            nullable = false
    )
    private AdminModel assignedBy;

    // Admin who receives the assessment
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "assigned_to_admin_id",
            nullable = false
    )
    private AdminModel assignedTo;

    // Whether this is currently the active assignment
    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @CreationTimestamp
    @Column(
            name = "assigned_at",
            nullable = false,
            updatable = false
    )
    private LocalDateTime assignedAt;
}