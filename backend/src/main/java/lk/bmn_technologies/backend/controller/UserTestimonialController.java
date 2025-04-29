package lk.bmn_technologies.backend.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.UserTestimonialCommentDTO;
import lk.bmn_technologies.backend.model.UserTestimonialCommentModel;
import lk.bmn_technologies.backend.repository.UserTestimonialCommentRepository;


@RestController
@RequestMapping("api/user-testimonial")
public class UserTestimonialController {

    @Autowired
    private UserTestimonialCommentRepository repository;
    
    @PostMapping("submit")
    public ResponseEntity<ApiResponseDTO> submitTestimonialComment(@RequestBody UserTestimonialCommentModel data) {
        try {
            data.setDate(Date.valueOf(LocalDate.now()));
            repository.save(data);
            return ResponseEntity
                .ok(new ApiResponseDTO(true, "Saved successfully"));
        }
        catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(true, "Error saving data: " + e.getMessage()));
        }
    }

    @GetMapping("get")
    public ResponseEntity<?> getTestimonialComment() {
        try {
            List<UserTestimonialCommentDTO> testimonialComments = repository
                .findAll()
                .stream()
                .map((commentEntity) -> new UserTestimonialCommentDTO(
                    commentEntity.getId(),
                    commentEntity.getName(),
                    commentEntity.getCompany(),
                    commentEntity.getPosision(), // still from entity
                    commentEntity.getEmail(),
                    commentEntity.getTestimonial(),
                    commentEntity.getRating(),
                    commentEntity.getDate()
                ))
                .collect(Collectors.toList());
                return ResponseEntity.ok(new ApiResponseDTO(false, "Fetched successfully", testimonialComments));
        }
        catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(true, "Error saving data: " + e.getMessage()));
        }
    }
    
    
}
