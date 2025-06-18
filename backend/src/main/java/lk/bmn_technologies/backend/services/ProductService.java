package lk.bmn_technologies.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.bmn_technologies.backend.model.ProductModel;
import lk.bmn_technologies.backend.repository.ProductRepo;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public void addProduct(ProductModel data) {
        repo.save(data);
    }
}
