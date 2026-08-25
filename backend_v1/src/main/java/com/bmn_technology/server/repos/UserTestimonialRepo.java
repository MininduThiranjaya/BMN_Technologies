package com.bmn_technology.server.repos;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bmn_technology.server.models.UserTestimonialModel;

public interface UserTestimonialRepo extends JpaRepository<UserTestimonialModel, Long>{
    
    List<UserTestimonialModel> findTop5ByIsAvailableTrueOrderByCreatedAtDesc();
}
