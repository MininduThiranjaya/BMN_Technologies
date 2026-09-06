package com.bmn_technology.server.DTO.req_dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import com.bmn_technology.server.enums.ProductCategory;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductEdit_req_dto {
    
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private ProductCategory category;
    private String imageOperations;
    private List<MultipartFile> images;
}
