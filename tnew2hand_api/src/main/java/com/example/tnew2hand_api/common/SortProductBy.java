package com.example.tnew2hand_api.common;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class SortProductBy {
    public static Pageable sortBy(String type,int page){
        Pageable pageable;
        switch (type){
            case "new":
                pageable= PageRequest.of(page,9, Sort.by("id").descending());
                break;
            case "nameDecrease":
                pageable=PageRequest.of(page,9, Sort.by("name").descending());
                break;
            case "nameIncrease":
                pageable=PageRequest.of(page,9, Sort.by("name").ascending());
                break;
            case "priceDecrease":
                pageable=PageRequest.of(page,9, Sort.by("price").descending());
                break;
            case "priceIncrease":
                pageable=PageRequest.of(page,9, Sort.by("price").ascending());
                break;
            case "sizeDecrease":
                pageable=PageRequest.of(page,9, Sort.by("size").descending());
                break;
            case "sizeIncrease":
                pageable=PageRequest.of(page,9, Sort.by("size").ascending());
                break;
            default:
                pageable=PageRequest.of(page,9);
        }
        return pageable;
    }
}
