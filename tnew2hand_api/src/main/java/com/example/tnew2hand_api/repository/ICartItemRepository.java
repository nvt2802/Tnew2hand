package com.example.tnew2hand_api.repository;

import com.example.tnew2hand_api.model.CartItem;
import com.example.tnew2hand_api.model.Product;
import com.example.tnew2hand_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICartItemRepository extends JpaRepository<CartItem,Long> {
    int countByUserAndAndFlagDeleted(User user,Boolean flagDeleted);
    CartItem findByUserAndProductAndFlagDeleted(User user, Product product,Boolean flagDeleted);

    List<CartItem> findByUserAndFlagDeleted(User user,Boolean flagDeleted);
    @Query(value = "select * from cart_item as ci " +
            "join product as p on p.id=ci.product_id " +
            "where (ci.quantity >p.quantity or ci.quantity <1) " +
            "and ci.flag_deleted = 0 and ci.user_id = :userId ",nativeQuery = true)
    List<CartItem> checkQuantity(@Param("userId") Long userId);
}
