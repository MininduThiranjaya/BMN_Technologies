package lk.bmn_technologies.backend.security;

import java.time.LocalDateTime;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import lk.bmn_technologies.backend.model.AdminUserModel;
import lk.bmn_technologies.backend.repository.AdminUserRepository;


public class AdminUserDetailsService implements UserDetailsService {

    private final AdminUserRepository repo;

    public AdminUserDetailsService(AdminUserRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AdminUserModel adminUser = repo.getAdminUserByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Admin user not found with email " + email));

        adminUser.setLastLogin(LocalDateTime.now());
        repo.save(adminUser);
        return new AdminUserDetails(adminUser);
    }

}
