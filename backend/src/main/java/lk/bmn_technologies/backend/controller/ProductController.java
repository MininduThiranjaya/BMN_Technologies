package lk.bmn_technologies.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
}
