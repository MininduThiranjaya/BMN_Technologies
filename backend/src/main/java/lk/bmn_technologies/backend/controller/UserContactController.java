package lk.bmn_technologies.backend.controller;

import java.util.List;
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
import lk.bmn_technologies.backend.model.UserContactModel;
import lk.bmn_technologies.backend.services.UserContactService;



@RestController
@RequestMapping("api/user-contact")
public class UserContactController {
    
    @Autowired
    private UserContactService service;
    
    @PostMapping("/inform")
    public ResponseEntity<ApiResponseDTO> submitIssues(@RequestBody UserContactModel data) {
        try {
            ApiResponseDTO response =  service.submitUserIssue(data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error saving data: " + e.getMessage()));
        }
    }

    @GetMapping("/get-issues")
    public List<UserContactModel> getIssues() {
        return service.getUserIssue();
    }

    @GetMapping("/get-all-issues")
    public List<UserContactModel> getAllIssues() {
        return service.getAllUserIssue();
    }

    @GetMapping("count")
    public long countUserContactInDatabase() {
        return service.countUserContacts();
    }

    @PutMapping("get-action")
    public ResponseEntity<ApiResponseDTO> makeAction(@RequestBody Map<String, Long> body) {
        long id  = body.get("id");
        try{
            String response = service.changeAction(id);
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
}