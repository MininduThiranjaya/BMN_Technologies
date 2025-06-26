package lk.bmn_technologies.backend.services;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.responseDTO.ProductDTO;
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

    public List<ProductDTO> getProduct() {
       return repo.findAll().stream()
            .map(ProductDTO::new)
            .collect(Collectors.toList());
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