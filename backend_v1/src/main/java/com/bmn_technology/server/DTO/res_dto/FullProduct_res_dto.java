package com.bmn_technology.server.DTO.res_dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.bmn_technology.server.enums.ProductCategory;
import com.bmn_technology.server.DTO.res_dto.ProductImage_res_dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FullProduct_res_dto {

    private Long id;
    private String productId;
    private String productName;
    private String productDescription;
    private BigDecimal productPrice;
    private ProductCategory category;
    private List<ProductImage_res_dto> images;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}