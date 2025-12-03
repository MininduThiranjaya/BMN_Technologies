package lk.bmn_technologies.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import lk.bmn_technologies.backend.model.UserContactModel;

@Repository
public interface UserContactRepository extends JpaRepository<UserContactModel, Long>{
    
    @Query("SELECT u FROM UserContactModel u WHERE u.isAvailable = 1")
    public List<UserContactModel> getAvailableUserIssues();

    @Query("SELECT u FROM UserContactModel u ORDER BY u.createdAt DESC")
    public List<UserContactModel> getAllUserIssues();

    @Transactional
    @Modifying
    @Query("UPDATE UserContactModel u SET u.isAvailable = 0 WHERE u.isAvailable = 1")
    public int makeUserIssuesRead();
}