package lk.bmn_technologies.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lk.bmn_technologies.backend.repository.AdminUserRepository;
import lk.bmn_technologies.backend.security.AdminUserDetailsService;
import lk.bmn_technologies.backend.security.JwtAuthenticationFilter;
import lk.bmn_technologies.backend.services.AuthenticationService;

@Configuration
public class SecurityConfig {

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(AuthenticationService service) {

        return new JwtAuthenticationFilter(service);
    }

    @Bean
    public UserDetailsService userDetailsService(AdminUserRepository repo) {

        AdminUserDetailsService service =  new AdminUserDetailsService(repo);
        return service;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {

        http
                .cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers(HttpMethod.POST, "api/verification-code/forget-password/send-mail").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/verification-code/check-code").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/admin/auth/login").permitAll()
                                .requestMatchers(HttpMethod.PUT, "api/admin/auth/forget-password/change-password").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/user-testimonial/get").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/user-testimonial/submit").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/auth/product/get/*").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/auth/product/get/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "api/auth/project/get/*").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/auth/project/get/*").permitAll()
                                .requestMatchers(HttpMethod.POST, "api/user-contact/inform").permitAll()
                                .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();
    }
}