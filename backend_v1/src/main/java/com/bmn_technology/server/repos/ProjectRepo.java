package com.bmn_technology.server.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bmn_technology.server.models.ProjectModel;

public interface ProjectRepo extends JpaRepository<ProjectModel, Long>{
    
    boolean findByProjectId(String id);
}
