package com.example.tnew2hand_api.service;

import com.example.tnew2hand_api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {
    Page<Product> getPageProduct(Pageable pageable, String searchName, Long searchCategory);

    Product getById(Long id);

    Page<Product> get3NewProduct(Pageable pageable);

}
