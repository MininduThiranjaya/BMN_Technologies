package lk.bmn_technologies.backend.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.ForgetPassword_ChangePassword_DTO;
import lk.bmn_technologies.backend.dto.responseDTO.UserResponseDTO;
import lk.bmn_technologies.backend.model.AdminUserModel;
import lk.bmn_technologies.backend.model.ProductModel;
import lk.bmn_technologies.backend.model.UserContactModel;
import lk.bmn_technologies.backend.repository.AdminUserRepository;

@Service
public class AdminUserService {

    @Autowired
    private AdminUserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ApiResponseDTO adminUserRegistrationService(AdminUserModel data) {

        Optional<AdminUserModel> user = repo.getAdminUserByEmail(data.getEmail());
        if (!user.isPresent()) {
            String encryptedPasword = passwordEncoder.encode(data.getPassword());
            data.setPassword(encryptedPasword);
            repo.save(data);
            return (new ApiResponseDTO(true, "Admin user registration successfully completed"));
        } else {
            return (new ApiResponseDTO(false, "Admin user exists - use differet email address"));
        }
    }

    public ApiResponseDTO forgetPassword_changePassword_service(ForgetPassword_ChangePassword_DTO data) {
        Optional<AdminUserModel> user = repo.getAdminUserByEmail(data.getEmail());
        if(user.isEmpty()) {
            return (new ApiResponseDTO(false, "Admin user not exsists"));
        }
        String encryptedPasword = passwordEncoder.encode(data.getNewPassword());
        int response = repo.changePassword(data.getEmail(), encryptedPasword);
        System.out.println(response);
        if(response > 0) {
            return (new ApiResponseDTO(true, "Changed password successfull"));
        }
        else {
            return (new ApiResponseDTO(false, "Failed changing password"));
        }
    }

    public int setLastLoginTime(String email,LocalDateTime lastLogin) {
        int isUpdated = repo.updateLastLoginTime(email, lastLogin);
        return isUpdated;
    }

    public List<UserResponseDTO> getAllUsers() {
        return repo.findAll()
            .stream()
            .map(user -> new UserResponseDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getUserName(),
                    user.getRole(),
                    user.getPhoneNumber(),
                    user.getLastLogin(),
                    user.getUpdateAt(),
                    user.getCreatedAt(),
                    user.isSuspended()
            ))
            .collect(Collectors.toList());
    }

    public String changeRole(long id) {
        AdminUserModel tempData = repo.getById(id);
        if(tempData.getRole().equals("super_admin")) {
            tempData.setRole("admin");
            repo.save(tempData);
            return "Role changed to admin";
        }
        else {
            tempData.setRole("super_admin");
            repo.save(tempData);
            return "Role changed to super_admin";
        }
    }

    public String setSuspention(long id) {
        AdminUserModel tempData = repo.getById(id);
        if(tempData.isSuspended()) {
            tempData.setSuspended(false);
            repo.save(tempData);
            return "User unsuspended successfully";
        }
        else {
            tempData.setSuspended(true);
            repo.save(tempData);
            return "User suspended successfully";
        }
    }

    public ApiResponseDTO deleteUser(long id) {
        Optional<AdminUserModel> userOpt = repo.findById(id);
        if (userOpt.isEmpty()) {
            return new ApiResponseDTO(false, "Admin user not found");
        }
        AdminUserModel user = userOpt.get();
        repo.deleteById(id);
        return new ApiResponseDTO(
                true,
                "Admin user deleted successfully",
                user.getEmail()
        );
    }   
}