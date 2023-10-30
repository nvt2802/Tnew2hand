package com.example.tnew2hand_api.repository;

import com.example.tnew2hand_api.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoryRepository extends JpaRepository<Category,Long> {

}
