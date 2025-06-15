package lk.bmn_technologies.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.AdminLoginDTO;
import lk.bmn_technologies.backend.dto.responseDTO.AdminLoginResponseDTO;
import lk.bmn_technologies.backend.dto.responseDTO.AuthResponseDTO;
import lk.bmn_technologies.backend.model.AdminUserModel;
import lk.bmn_technologies.backend.security.AdminUserDetails;
import lk.bmn_technologies.backend.services.AdminUserService;
import lk.bmn_technologies.backend.services.AuthenticationService;



@RestController
@RequestMapping("api/admin/auth")
public class AdminUserController {

    private final AuthenticationService authenticationService;

    public AdminUserController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Autowired
    private AdminUserService service;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseDTO> adminUserRegistration(@RequestBody AdminUserModel data) {

        try {
            ApiResponseDTO response =  service.adminUserRegistrationService(data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error registration of admin user: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authLogin(@RequestBody AdminLoginDTO data) {

        UserDetails userDetails = authenticationService.authenticate(data.getEmail(), data.getPassword());
        String token = authenticationService.generateToken(userDetails);
        if(token != null) {
            AuthResponseDTO response = new AuthResponseDTO(token, 3600000L, userDetails,true);
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity
                .status(401)
                .body(new AuthResponseDTO("Invalid credentials", 0, null, false));
        }
    }

    @GetMapping("/user/profile")
    public ResponseEntity<ApiResponseDTO> getAdminUser(Authentication authentication) {
        AdminUserDetails user = (AdminUserDetails) authentication.getPrincipal();
        if(user != null) {
            ApiResponseDTO response = new ApiResponseDTO(true, "User retrieved successfully", new AdminLoginResponseDTO(
                user.getAdminUser().getEmail(), 
                user.getAdminUser().getUserName(), 
                user.getAdminUser().getPhoneNumber(), 
                user.getAdminUser().getLastLogin(), 
                user.getAdminUser().getUpdateAt(), 
                user.getAdminUser().getCreatedAt()
            ));
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity
                .status(401)
                .body(new ApiResponseDTO(false, "Error registration of admin user: "));
        }
    }
}
