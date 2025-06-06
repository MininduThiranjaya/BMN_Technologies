package lk.bmn_technologies.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.AdminLoginDTO;
import lk.bmn_technologies.backend.model.AdminLoginModel;
import lk.bmn_technologies.backend.repository.AdminLoginRepository;

import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Optional;

@RestController
@RequestMapping("api/admin")
public class AdminLoginController {

    @Autowired
    private AdminLoginRepository userLoginRepository;

    @PostMapping("login")
    public ResponseEntity<ApiResponseDTO> login(@RequestBody AdminLoginDTO dto) {
        try {
            Optional<AdminLoginModel> userOptional = userLoginRepository.findByUsername(dto.getUsername());
            System.err.println("User Optional: " + userOptional.isPresent());
            // AdminLoginDTO temp = userLoginRepository.findOne(null)
             
            if (userOptional.isPresent()) {
                AdminLoginModel user = userOptional.get();
                if (BCrypt.checkpw(dto.getPassword(), user.getHashedPassword())) {
                    System.err.println("User: " + user.getUsername() + " " + user.getHashedPassword());
                    return ResponseEntity.ok(new ApiResponseDTO(true, "Login successful"));
                }
                else {
                    return ResponseEntity.status(401).body(new ApiResponseDTO(false, "Invalid password"));
                }
            }
            else {
                return ResponseEntity.status(401).body(new ApiResponseDTO(false, "Invalid username"));
            }
        }
        catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponseDTO(false, "Error: " + e.getMessage()));
        }
    }
}
