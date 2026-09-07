package com.bmn_technology.server.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import com.bmn_technology.server.models.ProjectModel;

public interface ProjectRepo extends JpaRepository<ProjectModel, Long>{
    
    boolean findByProjectId(String id);
    boolean existsByProjectId(String id);
    Page<ProjectModel> findByIsAvailableTrue(Pageable pageable);
    Page<ProjectModel> findByIsAvailableFalse(Pageable pageable);
    long countByIsAvailableTrue();
}
