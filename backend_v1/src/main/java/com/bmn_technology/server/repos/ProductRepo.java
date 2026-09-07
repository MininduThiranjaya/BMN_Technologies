package com.bmn_technology.server.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import com.bmn_technology.server.models.ProductModel;

public interface ProductRepo extends JpaRepository<ProductModel, Long>{
    
    boolean findByProductId(String id);
    boolean existsByProductId(String Id);
    Page<ProductModel> findByIsAvailableTrue(Pageable pageable);
    Page<ProductModel> findByIsAvailableFalse(Pageable pageable);
    long countByIsAvailableTrue();
}
