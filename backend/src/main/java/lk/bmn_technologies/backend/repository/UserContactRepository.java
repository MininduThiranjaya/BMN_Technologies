package lk.bmn_technologies.backend.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.model.UserContactModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface UserContactRepository extends JpaRepository<UserContactModel, Long>{
    
    @Query("SELECT u FROM UserContactModel u WHERE u.isAvailable = true")
    public List<UserContactModel> getAvailableUserIssues();
}