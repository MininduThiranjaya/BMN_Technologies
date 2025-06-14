package lk.bmn_technologies.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.model.AdminUserModel;

import java.util.Optional;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUserModel, Long>{
    // Optional<AdminUserModel> findByUsername(String username);

    @Query("select a from AdminUserModel a where email = ?1")
    public Optional<AdminUserModel> getAdminUserByEmail(String email);
}

