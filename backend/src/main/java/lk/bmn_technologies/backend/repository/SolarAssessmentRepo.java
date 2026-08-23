package lk.bmn_technologies.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import lk.bmn_technologies.backend.model.SolarAssessment;

public interface SolarAssessmentRepo extends JpaRepository<SolarAssessment, Long>{
    
}
