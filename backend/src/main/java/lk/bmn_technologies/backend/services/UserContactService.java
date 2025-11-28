package lk.bmn_technologies.backend.services;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.UserTestimonialCommentDTO;
import lk.bmn_technologies.backend.model.UserContactModel;
import lk.bmn_technologies.backend.repository.UserContactRepository;

@Service
public class UserContactService {
    
    @Autowired
    private UserContactRepository repo;

    public ApiResponseDTO submitUserIssue(UserContactModel data) {

        data.setCreatedAt(Date.valueOf(LocalDate.now()));
        data.setIsAvailable(true);
        repo.save(data);
        return (new ApiResponseDTO(true, "Saved successfully"));
    }

   public List<UserContactModel> getUserIssue() {
        try {
            return repo.getAvailableUserIssues();
        } catch (Exception e) {
            e.printStackTrace(); // log the real exception
            return Collections.emptyList(); // safely return empty list
        }
    }

}