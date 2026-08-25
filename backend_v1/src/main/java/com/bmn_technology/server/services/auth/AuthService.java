package com.bmn_technology.server.services.auth;

import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {
    
    String generateToken(UserDetails userDetails);
    UserDetails validateToken(String token);
    UserDetails authenticate(String email, String password);
    String extractUserEmail(String token);
}
