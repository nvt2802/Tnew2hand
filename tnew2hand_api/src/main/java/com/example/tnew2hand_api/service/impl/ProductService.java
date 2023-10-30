package com.example.tnew2hand_api.service.impl;

import com.example.tnew2hand_api.model.Category;
import com.example.tnew2hand_api.model.Product;
import com.example.tnew2hand_api.repository.ICategoryRepository;
import com.example.tnew2hand_api.repository.IProductRepository;
import com.example.tnew2hand_api.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;
@Autowired
private ICategoryRepository categoryRepository;
    @Override
    public Page<Product> getPageProduct(Pageable pageable, String searchName, Long searchCategory) {
        if (searchCategory != 0) {
            Category category = categoryRepository.findById(searchCategory).orElse(null);
            if(category==null){
                return null;
            }
            return productRepository.findProductsByNameContainingAndAndFlagDeletedAndCategoryAndQuantityGreaterThan(pageable,searchName,true,category,0);
        } else {
            return productRepository.findProductsByNameContainingAndAndFlagDeletedAndQuantityGreaterThan(pageable, searchName, true,0);
        }
    }

    @Override
    public Product getById(Long id) {
        return productRepository.findByIdAndFlagDeleted(id,true).orElse(null);
    }

    @Override
    public Page<Product> get3NewProduct(Pageable pageable) {
        return  productRepository.findAll(pageable);
    }
}
