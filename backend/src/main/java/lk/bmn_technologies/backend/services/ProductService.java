package lk.bmn_technologies.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.dto.responseDTO.ProductDTO;
import lk.bmn_technologies.backend.model.ProductImageModel;
import lk.bmn_technologies.backend.model.ProductModel;
import lk.bmn_technologies.backend.repository.ProductRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

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
}
