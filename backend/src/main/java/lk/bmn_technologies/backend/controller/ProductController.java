package lk.bmn_technologies.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lk.bmn_technologies.backend.dto.ApiResponseDTO;
import lk.bmn_technologies.backend.dto.responseDTO.ProductDTO;
import lk.bmn_technologies.backend.model.ProductModel;
import lk.bmn_technologies.backend.services.ProductService;




@RestController
@RequestMapping("/api/auth/product")
public class ProductController {

    @Autowired
    private ProductService service;

    @PostMapping("/add")
    public void addProductIntoDatabase(@RequestBody ProductModel data) {
        service.addProduct(data);
    }

    @GetMapping("/get/{category}")
    public List<ProductDTO> getProductsFromDatabase(@PathVariable("category") String category) {
        return service.getProduct(category);
    }
    

    @GetMapping("/count")
    public long countProductsInDatabase() {
        return service.countProducts();
    }

    @GetMapping("/all-details/get")
    public List<ProductModel> getProductWithAllDetailsFromDatabase() {
        return service.getProductWithAllDetails();
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<ApiResponseDTO> deleteProductFromDatabase(@PathVariable("id") long id) {
        try{
            ApiResponseDTO response = service.deleteProduct(id);
            return ResponseEntity.ok(response);
        }
        catch(Exception e) {
            return ResponseEntity
                .status(500)
                .body(new ApiResponseDTO(false, "Error deleting product: " + e.getMessage()));
        }
    }
    
    
}
