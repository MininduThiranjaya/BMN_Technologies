package lk.bmn_technologies.backend.services;


import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.UserTestimonialCommentDTO;
import lk.bmn_technologies.backend.model.UserTestimonialCommentModel;
import lk.bmn_technologies.backend.repository.UserTestimonialCommentRepository;

@Service
public class UserTestimonialService {

    @Autowired
    private UserTestimonialCommentRepository repo;

    public ApiResponseDTO submitTestimonialCommentService(UserTestimonialCommentModel data) {

        data.setDate(Date.valueOf(LocalDate.now()));
        repo.save(data);
        return (new ApiResponseDTO(true, "Saved successfully"));
    }

    public ApiResponseDTO getTestimonialCommentService() {

        Pageable pageable = PageRequest.of(0, 4, Sort.by("date").descending());
        
        List<UserTestimonialCommentDTO> testimonialComments = repo
            .getUserTestimonialComment(pageable)
            .stream()
            .map((commentEntity) -> new UserTestimonialCommentDTO(
                commentEntity.getId(),
                commentEntity.getName(),
                commentEntity.getCompany(),
                commentEntity.getPosition(), // still from entity
                commentEntity.getEmail(),
                commentEntity.getTestimonial(),
                commentEntity.getRating(),
                commentEntity.getDate()
            ))
            .collect(Collectors.toList());

        return (new ApiResponseDTO(true, "Fetched successfully", testimonialComments));
    }
}
