package com.bmn_technology.server.repos;

import java.util.Optional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bmn_technology.server.models.SolarAssessment;

public interface SolarAssessmentRepo extends JpaRepository<SolarAssessment, Long>{
    
    Optional<SolarAssessment> findById(Long id);
    Page<SolarAssessment> findByIsReadFalse(Pageable pageable);
}
