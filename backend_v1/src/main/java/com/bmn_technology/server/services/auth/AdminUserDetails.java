package com.bmn_technology.server.services.auth;

import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bmn_technology.server.models.AdminModel;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AdminUserDetails implements UserDetails {

    private final AdminModel adminModel;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
            new SimpleGrantedAuthority("ROLE_" + adminModel.getRole().name())
        );
    }

    @Override
    public String getPassword() {
        return adminModel.getPassword();
    }

    @Override
    public String getUsername() {
        return adminModel.getEmail();
    }
}
