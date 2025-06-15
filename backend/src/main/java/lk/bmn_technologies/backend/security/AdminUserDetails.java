package lk.bmn_technologies.backend.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lk.bmn_technologies.backend.model.AdminUserModel;

public class AdminUserDetails implements UserDetails {

    private final AdminUserModel adminUserModel;

    public AdminUserDetails(AdminUserModel adminUserModel) {
        this.adminUserModel = adminUserModel;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE.USER"));
    }

    @Override
    public String getPassword() {
        return adminUserModel.getPassword();
    }

    @Override
    public String getUsername() {
        return adminUserModel.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Long getId() {
        return adminUserModel.getId();
    }  
}
