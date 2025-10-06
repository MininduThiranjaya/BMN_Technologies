package lk.bmn_technologies.backend.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.dto.responseDTO.ProjectDTO;
import lk.bmn_technologies.backend.model.ProjectModel;

@Repository
public interface ProjectRepo extends JpaRepository<ProjectModel, Long> {
    
    @Query("SELECT p FROM ProjectModel p " +
    "WHERE (:category IS NULL OR p.category = :category) " +
    "AND (:location IS NULL OR p.location = :location) " +
    "AND (:projectMinDate IS NULL OR p.projectDate >= :projectMinDate) " +
    "AND (:projectMaxDate IS NULL OR p.projectDate <= :projectMaxDate)")
    public List<ProjectDTO> getFilteredProjects(String category, String location, Date projectMinDate, Date projectMaxDate);
}
