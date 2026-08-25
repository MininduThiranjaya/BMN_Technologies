package com.bmn_technology.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.bmn_technology.server.services.auth.AuthService;

import tools.jackson.databind.ObjectMapper;

@Configuration
@EnableMethodSecurity
public class serverSecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtFilter jwtFilter) throws Exception {

        http
            .cors(withDefaults())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth ->
                auth
                    .requestMatchers(HttpMethod.POST, "/bmn_tech/api/admin/register").permitAll()
                    .requestMatchers(HttpMethod.POST, "/bmn_tech/api/admin/login").permitAll()
                    .requestMatchers(HttpMethod.POST, "/bmn_tech/api/user/**").permitAll()
                    .requestMatchers(HttpMethod.GET, "/bmn_tech/api/user/**").permitAll()
                    .anyRequest().authenticated()
            ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtFilter jwtFilter(AuthService authService, ObjectMapper objectMapper) {
        return new JwtFilter(authService, objectMapper);
    }
}
