package com.bmn_technology.server.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bmn_technology.server.enums.AdminRoles;
import com.bmn_technology.server.models.AdminModel;

public interface AdminRepo extends JpaRepository<AdminModel, Long>{
    
    Boolean existsByEmail(String email);
    Optional<AdminModel> findByEmail(String Email);
    Optional<AdminModel> findByIdAndRole(
        Long id,
        AdminRoles role
    );
}
