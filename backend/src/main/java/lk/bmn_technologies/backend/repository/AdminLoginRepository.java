package lk.bmn_technologies.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.model.AdminLoginModel;

@Repository
public interface AdminLoginRepository extends JpaRepository<AdminLoginModel, Long>{

}

