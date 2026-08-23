package lk.bmn_technologies.backend.controller;

import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.SolarAssessmentRequestDTO;
import lk.bmn_technologies.backend.dto.responseDTO.SolarAssessmentResponseDTO;
import lk.bmn_technologies.backend.model.UserContactModel;
import lk.bmn_technologies.backend.services.SolarAssessmentService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/user-solar-assessment")
@AllArgsConstructor
public class SolarAssessmentController {
    
    private final SolarAssessmentService service;
    
    @PostMapping("submit")
    public ResponseEntity<ApiResponseDTO> submitTestimonialComment(@RequestBody SolarAssessmentRequestDTO data) {
        try {
            ApiResponseDTO response =  service.submitSolarAssessmentService(data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error saving data: " + e.getMessage()));
        }
    }

    @GetMapping("get-all-assessment")
    public ResponseEntity<List<SolarAssessmentResponseDTO>> getAllAssessment() {
        List<SolarAssessmentResponseDTO> response = service.getAllSolarAssessmentService();
        return ResponseEntity.ok(response);
    }

    @PutMapping("set-action")
    public ResponseEntity<ApiResponseDTO> makeAction(@RequestBody Map<String, Long> body) {
        long id  = body.get("id");
        try{
            String response = service.changeActionService(id);
            return ResponseEntity
                .status(200)
                .body(new ApiResponseDTO(true, "Changed status" + response));
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error changing status: " + e.getMessage()));
        }
    }

    @PutMapping("set-mark-as-read")
    public ResponseEntity<ApiResponseDTO> markAsRead(@RequestBody Map<String, Long> body) {
        long id  = body.get("id");
        try{
            String response = service.markAsReadService(id);
            return ResponseEntity
                .status(200)
                .body(new ApiResponseDTO(true, "Mark as read" + response));
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error marking as read: " + e.getMessage()));
        }
    }
}
