package com.bmn_technology.server.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bmn_technology.server.models.SolarAssessmentAssignment;

public interface SolarAssessmentAssignmentRepo extends JpaRepository<SolarAssessmentAssignment, Long>{
    
    boolean existsBySolarAssessment_Id(Long solarAssessmentId);
}
