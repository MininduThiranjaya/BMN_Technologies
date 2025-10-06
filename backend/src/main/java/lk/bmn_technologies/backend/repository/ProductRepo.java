package lk.bmn_technologies.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import lk.bmn_technologies.backend.dto.responseDTO.ProductDTO;
import lk.bmn_technologies.backend.model.ProductModel;

@Repository
public interface ProductRepo extends JpaRepository<ProductModel, Long> {

    @Query("SELECT p FROM ProductModel p " +
       "WHERE (:category IS NULL OR p.category = :category) " +
       "AND (:minPrice IS NULL OR p.productPrice >= :minPrice) " +
       "AND (:maxPrice IS NULL OR p.productPrice <= :maxPrice)")
    public List<ProductDTO> getFilteredProducts(String category, Integer minPrice, Integer maxPrice);
}
