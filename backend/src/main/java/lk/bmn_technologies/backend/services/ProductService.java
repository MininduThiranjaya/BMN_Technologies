package lk.bmn_technologies.backend.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.requestDTO.ProductFilterDTO;
import lk.bmn_technologies.backend.model.ProductImageModel;
import lk.bmn_technologies.backend.model.ProductModel;
import lk.bmn_technologies.backend.repository.ProductImageRepo;
import lk.bmn_technologies.backend.repository.ProductRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ProductImageRepo productImageRepo;

    public void addProduct(ProductModel data) {

        if(data.getImageUrl() != null) {
            for(ProductImageModel image : data.getImageUrl()) {
                image.setProduct(data);
            }
        }
        repo.save(data);
    }

    public void editProduct(Long id, ProductModel data) {

        if(repo.existsById(id)) {
            
            Optional<ProductModel> existing = repo.findById(id);
            ProductModel existingObject = existing.get();

            if (data.getProductId() != null) {
                existingObject.setProductId(data.getProductId());
            }

            if (data.getProductName() != null) {
                existingObject.setProductName(data.getProductName());
            }

            if (data.getProductDescription() != null) {
                existingObject.setProductDescription(data.getProductDescription());
            }

            if (data.getProductPrice() != null) {
                existingObject.setProductPrice(data.getProductPrice());
            }

            if (data.getCategory() != null) {
                existingObject.setCategory(data.getCategory());
            }

            // Images handling (replace strategy)
            if (data.getImageUrl() != null) {

                // remove old images
                if (existingObject.getImageUrl() != null) {
                    existingObject.getImageUrl().clear();
                }

                // add new images
                for (ProductImageModel img : data.getImageUrl()) {
                    img.setProduct(existingObject);
                }

                existingObject.setImageUrl(data.getImageUrl());
            }

            repo.save(existingObject);    
        }
    }   

    // public List<ProductDTO> getProduct(String category) {

    //     String filter;

    //     filter = switch (category) {
    //         case "solar-panels" -> "Sola Panels";
    //         case "battery-storage" -> "Battery Storage";
    //         case "smart-energy" -> "Smart Energy System";
    //         default -> "Hybrid Inverters";
    //     };

    //     return repo.findAll().stream()
    //         .filter((product) -> product.getCategory().equals(filter))
    //         .map(ProductDTO::new)
    //         .collect(Collectors.toList());
    // }

    public List<ProductModel> getFilteredProduct(ProductFilterDTO productFilter) {

        String filter;

        filter = switch (productFilter.getCategory()) {
            case "solar-panels" -> "Sola Panels";
            case "battery-storage" -> "Battery Storage";
            case "smart-energy" -> "Smart Energy System";
            default -> "Hybrid Inverters";
        };

        List<ProductModel> filteredProductList = repo.getFilteredProducts(filter, productFilter.getMinPrice(), productFilter.getMaxPrice());

        return filteredProductList;
    }

    public long countProducts() {
        return repo.count();
    }

    public List<ProductModel> getProductWithAllDetails() {
       return repo.findAll();
    } 

    public ApiResponseDTO deleteProduct(Long id) {
        if(repo.existsById(id)) {
            List<String> imagePublicIdList = productImageRepo.getProductImages(id);
            Optional<ProductModel> product = repo.findById(id);
            Map<String, Boolean> results = cloudinaryService.deleteImagesFromCloudinary(imagePublicIdList);
            if(results.values().stream().allMatch(Boolean::booleanValue)) {
                repo.deleteById(id);
                return new ApiResponseDTO(true, "Product deleted successfully", product);
            }
            return new ApiResponseDTO(false, "Failed product image deletion - Failed product deletion");
        }
        return new ApiResponseDTO(false, "Product is not available", null);
    }
}