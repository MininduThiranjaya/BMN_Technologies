package lk.bmn_technologies.backend.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.AdminLoginDTO;
import lk.bmn_technologies.backend.model.AdminUserModel;
import lk.bmn_technologies.backend.repository.AdminUserRepository;

@Service
public class AdminUserService {

    @Autowired
    private AdminUserRepository repo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public ApiResponseDTO adminUserRegistrationService(AdminUserModel data) {
        
        Optional<AdminUserModel> user = repo.getAdminUserByEmail(data.getEmail());
        if(!user.isPresent()) {
            String encryptedPasword = passwordEncoder.encode(data.getPassword());
            data.setPassword(encryptedPasword);
            repo.save(data);
            return (new ApiResponseDTO(true, "Admin user registration successfully completed"));
        }
        else {
            return (new ApiResponseDTO(false, "Admin user exists - use differet email address"));
        }  
    }

    public ApiResponseDTO adminUserLoginService(AdminLoginDTO data) {

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Optional<AdminUserModel> user = repo.getAdminUserByEmail(data.getEmail());
        if(user.isPresent()) {
            boolean isMatch = encoder.matches(data.getPassword(), user.get().getPassword());
            if(user.get().getEmail().equals(data.getEmail()) && isMatch) {
                user.get().setLastLogin(LocalDateTime.now());
                return (new ApiResponseDTO(true, "Admin User login success", user));
            }
            else {
                return (new ApiResponseDTO(false, "Invalied credentials"));
            }
        }
        else {
            return (new ApiResponseDTO(false, "Admin user not exsists"));
        }
    }

}
