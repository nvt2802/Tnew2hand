package com.example.tnew2hand_api.controler;

import com.example.tnew2hand_api.common.SortProductBy;
import com.example.tnew2hand_api.model.Category;
import com.example.tnew2hand_api.model.Product;
import com.example.tnew2hand_api.service.ICategoryService;
import com.example.tnew2hand_api.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@CrossOrigin("*")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private IProductService productService;
    @Autowired
    private ICategoryService categoryService;

    @RequestMapping("/list")
    public ResponseEntity<Page<Product>> getPageProduct(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "") String searchName,
                                                        @RequestParam String sortBy,
                                                        @RequestParam(defaultValue = "0") Long searchCategory
    ) {

        Pageable pageable = SortProductBy.sortBy(sortBy, page);
        Page<Product> products = productService.getPageProduct(pageable, searchName, searchCategory);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categories = categoryService.getAll();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getProductById(@PathVariable Long id) {
        Product product = productService.getById(id);
        if (product == null) {
            return new ResponseEntity<>("Product not found", HttpStatus.OK);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/get-new")
    public ResponseEntity<?> getNewProduct() {
        Pageable pageable = PageRequest.of(0, 3, Sort.by("id").descending());
        Page<Product> products = productService.get3NewProduct(pageable);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
