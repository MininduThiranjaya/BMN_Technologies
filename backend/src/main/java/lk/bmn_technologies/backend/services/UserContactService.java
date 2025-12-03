package lk.bmn_technologies.backend.services;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.model.UserContactModel;
import lk.bmn_technologies.backend.repository.UserContactRepository;

@Service
public class UserContactService {
    
    @Autowired
    private UserContactRepository repo;

    public ApiResponseDTO submitUserIssue(UserContactModel data) {

        data.setCreatedAt(LocalDateTime.now());
        data.setIsAvailable(1);
        repo.save(data);
        return (new ApiResponseDTO(true, "Saved successfully"));
    }

   public List<UserContactModel> getUserIssue() {
        try {
            List<UserContactModel> tempUserIssues =  repo.getAvailableUserIssues();
            repo.makeUserIssuesRead();
            return tempUserIssues;
        } catch (Exception e) {
            e.printStackTrace(); // log the real exception
            return Collections.emptyList(); // safely return empty list
        }
    }

    public List<UserContactModel> getAllUserIssue() {
        try {
            return repo.getAllUserIssues();
        } catch (Exception e) {
            e.printStackTrace(); // log the real exception
            return Collections.emptyList(); // safely return empty list
        }
    }

    public long countUserContacts() {
        return repo.count();
    }
}