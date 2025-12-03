package lk.bmn_technologies.backend.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import lk.bmn_technologies.backend.model.AdminUserModel;

@Repository
public interface AdminUserRepository extends JpaRepository<AdminUserModel, Long>{
    // Optional<AdminUserModel> findByUsername(String username);

    @Query("select a from AdminUserModel a where email = ?1")
    public Optional<AdminUserModel> getAdminUserByEmail(String email);

    @Transactional
    @Modifying
    @Query("update AdminUserModel a set a.password = ?2 where a.email = ?1")
    public int changePassword(String email, String encodedPassword);

    @Transactional
    @Modifying
    @Query("update AdminUserModel a set a.lastLogin = ?2 where a.email = ?1")
    public int updateLastLoginTime(String email, LocalDateTime lastLogin);
}