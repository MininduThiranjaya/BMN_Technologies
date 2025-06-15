package lk.bmn_technologies.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.model.UserTestimonialCommentModel;
import lk.bmn_technologies.backend.services.UserTestimonialService;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
@RequestMapping("api/user-testimonial")
public class UserTestimonialController {

    @Autowired
    private UserTestimonialService service;
    
    @PostMapping("submit")
    public ResponseEntity<ApiResponseDTO> submitTestimonialComment(@RequestBody UserTestimonialCommentModel data) {

        try {
            ApiResponseDTO response =  service.submitTestimonialCommentService(data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error saving data: " + e.getMessage()));
        }
    }

    @GetMapping("get")
    public ResponseEntity<ApiResponseDTO> getTestimonialComment() {

        try {
            ApiResponseDTO response = service.getTestimonialCommentService();
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error saving data: " + e.getMessage()));
        }
    }
    
    
}
