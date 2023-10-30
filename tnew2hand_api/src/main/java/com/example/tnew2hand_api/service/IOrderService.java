package com.example.tnew2hand_api.service;

import com.example.tnew2hand_api.dto.UserDto;
import com.example.tnew2hand_api.model.AppOrder;
import com.example.tnew2hand_api.model.CartItem;
import com.example.tnew2hand_api.model.Product;
import com.example.tnew2hand_api.model.User;

import java.util.List;

public interface IOrderService {

    int getQuantityCartByUser(User user);

    CartItem addToCart(Product product, User userName, int quantity);

    List<CartItem> getAllCart(User user);

    CartItem deleteById(Long id);

    Long saveOrder(User user, UserDto userDto);

    Boolean checkQuantityOfCart(User user);

    List<AppOrder> findByUser(User user);

    AppOrder findById(Long id);
}
