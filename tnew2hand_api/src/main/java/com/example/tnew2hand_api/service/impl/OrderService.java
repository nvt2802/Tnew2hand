package com.example.tnew2hand_api.service.impl;

import com.example.tnew2hand_api.dto.UserDto;
import com.example.tnew2hand_api.model.AppOrder;
import com.example.tnew2hand_api.model.CartItem;
import com.example.tnew2hand_api.model.Product;
import com.example.tnew2hand_api.model.User;
import com.example.tnew2hand_api.repository.ICartItemRepository;
import com.example.tnew2hand_api.repository.IOrderRepository;
import com.example.tnew2hand_api.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private ICartItemRepository cartItemRepository;

    @Autowired
    private IOrderRepository orderRepository;
    @Override
    public int getQuantityCartByUser(User user) {
        return cartItemRepository.countByUserAndAndFlagDeleted(user,false);
    }

    @Override
    public CartItem addToCart(Product product, User user, int quantity) {
        CartItem cartItem = cartItemRepository.findByUserAndProductAndFlagDeleted(user,product,false);
        if(cartItem!=null){
            if((cartItem.getQuantity()+quantity)<1||(cartItem.getQuantity()+quantity)>cartItem.getProduct().getQuantity()){
                return null;
            }
            cartItem.setQuantity(cartItem.getQuantity()+quantity);
            return cartItemRepository.save(cartItem);
        }
        if(quantity<1||quantity>product.getQuantity()){
            return null;
        }
        cartItem = new CartItem(quantity,false,user,product);
        return cartItemRepository.save(cartItem);
    }

    @Override
    public List<CartItem> getAllCart(User user) {
        return cartItemRepository.findByUserAndFlagDeleted(user,false);
    }

    @Override
    public CartItem deleteById(Long id) {
        CartItem cartItem = cartItemRepository.findById(id).orElse(null);
        if(cartItem==null){
            return cartItem;
        }else {
            cartItem.setFlagDeleted(true);
            cartItemRepository.save(cartItem);
        }
        return cartItem;
    }

    @Override
    public Long saveOrder(User user, UserDto userDto) {
        return orderRepository.createOrderForUser(user.getId(),userDto.getName(),userDto.getAddress(),userDto.getPhoneNumber());
    }

    @Override
    public Boolean checkQuantityOfCart(User user) {
        return cartItemRepository.checkQuantity(user.getId()).size()<1;
    }

    @Override
    public List<AppOrder> findByUser(User user) {
        return orderRepository.findByUserAndFlagDeletedOrderByIdDesc(user,false);
    }

    @Override
    public AppOrder findById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }
}
