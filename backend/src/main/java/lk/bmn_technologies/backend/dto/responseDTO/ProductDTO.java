package lk.bmn_technologies.backend.dto.responseDTO;

import java.util.List;
import java.util.stream.Collectors;

import lk.bmn_technologies.backend.model.ProductImageModel;
import lk.bmn_technologies.backend.model.ProductModel;

public class ProductDTO {
    private String productId;
    private String productName;
    private String productDescription;
    private Double productPrice;
    private String category;
    private List<String> imageUrl;
    
    public ProductDTO(String productId, String productName, String productDescription, Double productPrice,
            String category, List<ProductImageModel> imageUrl) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.category = category;
        this.imageUrl = imageUrl.stream()
            .map(ProductImageModel::getImageUrl)
            .collect(Collectors.toList());
    }

    public ProductDTO(ProductModel product) {
        this(
            product.getProductId(),
            product.getProductName(),
            product.getProductDescription(),
            product.getProductPrice(),
            product.getCategory(),
            product.getImageUrl()
        );
    }


    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Double productPrice) {
        this.productPrice = productPrice;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<String> getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(List<String> imageUrl) {
        this.imageUrl = imageUrl;
    }

}
