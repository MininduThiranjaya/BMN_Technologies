package com.bmn_technology.server.services.auth;

import java.nio.charset.StandardCharsets;
import java.util.*;
import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService implements AuthService {
    
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final String secretKey;
    private final long jwtExpiry = 3_600_000L;

    public JwtService(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, @Value("${jwt.secret}") String secretKey) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.secretKey = secretKey;
    }

    @Override
    public String generateToken(UserDetails userDetails) {

        List<String> roles = userDetails.getAuthorities()
        .stream()
        .map(GrantedAuthority::getAuthority)
        .toList();

        
        Map <String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        
        return Jwts.builder()
            .claims()
            .add(claims)
            .subject(userDetails.getUsername())
            .issuer("bmn_tech-auth")
            .audience().add("bmn_tech-api")
            .and()
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(new Date(System.currentTimeMillis() + jwtExpiry))
            .and()
            .signWith(getSignKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public Key getSignKey() {

        byte[] keyBites = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBites);
    }

    @Override
    public UserDetails authenticate(String email, String password) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        return (UserDetails) authentication.getPrincipal();
    }

    @Override
    public UserDetails validateToken(String token) {

        String email = extractUserEmail(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        return userDetails;
    }

    @Override
    public String extractUserEmail(String token) {
        
        Claims claims = Jwts.parser()
            .setSigningKey(getSignKey())
            .requireIssuer("bmn_tech-auth")
            .requireAudience("bmn_tech-api")
            .build()
            .parseClaimsJws(token)
            .getBody();
        return claims.getSubject();
    }
}
