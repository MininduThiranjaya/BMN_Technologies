package com.bmn_technology.server.DTO.req_dto;

import com.bmn_technology.server.enums.ProductCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreate_req_dto {

    @NotBlank(message = "Product ID is required")
    @Size(max = 100, message = "Product ID must not exceed 100 characters")
    private String productId;

    @NotBlank(message = "Product name is required")
    @Size(max = 200, message = "Product name must not exceed 200 characters")
    private String productName;

    @NotBlank(message = "Product description is required")
    private String productDescription;

    @NotNull(message = "Product price is required")
    @DecimalMin(
        value = "0.0",
        inclusive = false,
        message = "Product price must be greater than 0"
    )
    private BigDecimal productPrice;

    @NotNull(message = "Product category is required")
    private ProductCategory category;

    @Size(
        min = 1,
        max = 5,
        message = "Product must have between 1 and 5 images"
    )
    @Builder.Default
    private List<MultipartFile> images = new ArrayList<>();
}