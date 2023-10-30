package com.example.tnew2hand_api.repository;

import com.example.tnew2hand_api.model.Category;
import com.example.tnew2hand_api.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findProductsByNameContainingAndAndFlagDeletedAndQuantityGreaterThan(Pageable pageable,String name, Boolean flagDeleted,Integer quantity);
    Page<Product> findProductsByNameContainingAndAndFlagDeletedAndCategoryAndQuantityGreaterThan(Pageable pageable, String name, Boolean flagDeleted, Category category,Integer quantity);
    Optional<Product> findByIdAndFlagDeleted(Long id, Boolean flagDeleted);
}
