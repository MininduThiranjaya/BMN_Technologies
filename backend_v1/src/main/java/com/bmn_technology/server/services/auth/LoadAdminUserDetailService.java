package com.bmn_technology.server.services.auth;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bmn_technology.server.models.AdminModel;
import com.bmn_technology.server.repos.AdminRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LoadAdminUserDetailService implements UserDetailsService {

    private final AdminRepo repo;
    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        AdminModel user = repo.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
        return new AdminUserDetails(user);
    }
}