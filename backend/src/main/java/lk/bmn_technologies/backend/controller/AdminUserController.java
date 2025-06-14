package lk.bmn_technologies.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.AdminLoginDTO;
import lk.bmn_technologies.backend.dto.responseDTO.AuthResponseDTO;
import lk.bmn_technologies.backend.model.AdminUserModel;
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

    @PostMapping("registration")
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
        AuthResponseDTO response = new AuthResponseDTO(token, 86400);
        return ResponseEntity.ok(response);
    }
}
