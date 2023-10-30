package com.example.tnew2hand_api.service.impl;

import com.example.tnew2hand_api.model.Category;
import com.example.tnew2hand_api.repository.ICategoryRepository;
import com.example.tnew2hand_api.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    @Autowired
    private ICategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
}
