package lk.bmn_technologies.backend.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.model.UserTestimonialCommentModel;
import lk.bmn_technologies.backend.services.UserTestimonialService;




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
    
    
    @GetMapping("count")
    public long countUserTestimonialInDatabase() {
        return service.countUserTestimonial();
    }

    @PutMapping("change-state")
    public ResponseEntity<ApiResponseDTO> deleteProductFromDatabase(@RequestBody Map<String, Long> body) {
        long id  = body.get("id");
        try{
            String response = service.changeState(id);
            return ResponseEntity
                .status(200)
                .body(new ApiResponseDTO(true, "Changed status" + response));
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error deleting product: " + e.getMessage()));
        }
    }

    @GetMapping("get-all")
    public ResponseEntity<ApiResponseDTO> getAllTestimonialComment() {
        try {
            ApiResponseDTO response = service.getAllTestimonialCommentService();
            return ResponseEntity.ok(response);
        }
        catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error saving data: " + e.getMessage()));
        }
    }
}
