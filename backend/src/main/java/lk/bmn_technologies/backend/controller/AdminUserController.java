package lk.bmn_technologies.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.AdminLoginDTO;
import lk.bmn_technologies.backend.dto.requestDTO.ForgetPassword_ChangePassword_DTO;
import lk.bmn_technologies.backend.dto.responseDTO.AdminLoginResponseDTO;
import lk.bmn_technologies.backend.dto.responseDTO.AuthResponseDTO;
import lk.bmn_technologies.backend.dto.responseDTO.UserResponseDTO;
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
        AdminUserDetails adminUser = (AdminUserDetails) userDetails;
        if(token != null && adminUser.getAdminUser().isSuspended() == false) {
            String role = userDetails.getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority();
            AuthResponseDTO response = new AuthResponseDTO(token, 3600000L, adminUser.getAdminUser().getId(), role, true);
            return ResponseEntity.ok(response);
        }
        else if(adminUser.getAdminUser().isSuspended() == true) {
            return ResponseEntity
                .status(403)
                .body(new AuthResponseDTO(null, 0, "User is suspended", null,false));
        } else {
            return ResponseEntity
                .status(401)
                .body(new AuthResponseDTO(null, 0, "Invalid credentials", null,false));
        }
    }

    @GetMapping("/user/profile")
    public ResponseEntity<ApiResponseDTO> getAdminUser(Authentication authentication) {
        AdminUserDetails user = (AdminUserDetails) authentication.getPrincipal();
        if(user != null) {
            ApiResponseDTO response = new ApiResponseDTO(true, "User retrieved successfully", new AdminLoginResponseDTO(
                user.getAdminUser().getEmail(), 
                user.getAdminUser().getUserName(),
                user.getAdminUser().getRole(), 
                user.getAdminUser().getPhoneNumber(), 
                user.getAdminUser().getLastLogin(),
                user.getAdminUser().getUpdateAt(), 
                user.getAdminUser().getCreatedAt(),
                user.getAdminUser().isSuspended()
            ));
            return ResponseEntity.ok(response);
        }
        else {
            return ResponseEntity
                .status(401)
                .body(new ApiResponseDTO(false, "Admin user not found"));
        }
    }

    @GetMapping("/user/get-all")
    public ResponseEntity<ApiResponseDTO> getAllUsers() {
        try {
            List<UserResponseDTO> users = service.getAllUsers();
            if(users.isEmpty()) {
                return ResponseEntity
                    .status(404)
                    .body(new ApiResponseDTO(false, "No users found"));
            }
            return ResponseEntity.ok(
                    new ApiResponseDTO(true, "Users fetched successfully", users)
            );
        } catch (Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error fetching users"));
        }
    }

    @PutMapping("forget-password/change-password")
    public ResponseEntity<ApiResponseDTO> forgetPassword_changePassword(@RequestBody ForgetPassword_ChangePassword_DTO data) {
        
        try {
            ApiResponseDTO response = service.forgetPassword_changePassword_service(data);
            if(response.isSuccess()) {
                return ResponseEntity.ok(response);
            }
            else {
                return ResponseEntity
                    .status(300)
                    .body(response);
            }
        }
        catch(Exception e) {
             return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error changing password"));
        }
    }

    @PutMapping("user/change-role/{id}")
    public ResponseEntity<ApiResponseDTO> changeUserRole(@PathVariable("id") long id) {
        try{
            String response = service.changeRole(id);
            return ResponseEntity
                .status(200)
                .body(new ApiResponseDTO(true, response));
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error changing status: " + e.getMessage()));
        }
    }

    @PutMapping("user/set-suspention/{id}")
    public ResponseEntity<ApiResponseDTO> makeSuspention(@PathVariable("id") long id) {
        try{
            String response = service.setSuspention(id);
            return ResponseEntity
                .status(200)
                .body(new ApiResponseDTO(true, response));
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error changing status: " + e.getMessage()));
        }
    }

    @DeleteMapping("user/delete-by-id/{id}")
    public ResponseEntity<ApiResponseDTO> deleteAdminUser(@PathVariable("id") long id) {
        try{
            ApiResponseDTO response = service.deleteUser(id);
            return ResponseEntity.ok(response);
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error deleting admin user: " + e.getMessage()));
        }
    }
}