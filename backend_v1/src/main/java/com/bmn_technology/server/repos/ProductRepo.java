package com.bmn_technology.server.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bmn_technology.server.models.ProductModel;

public interface ProductRepo extends JpaRepository<ProductModel, Long>{
    
    boolean findByProductId(String id);
}
