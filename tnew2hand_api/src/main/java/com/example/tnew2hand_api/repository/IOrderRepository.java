package com.example.tnew2hand_api.repository;

import com.example.tnew2hand_api.model.AppOrder;
import com.example.tnew2hand_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IOrderRepository extends JpaRepository<AppOrder,Long> {

    @Transactional
    @Query(value = "call createOrder(:user_id_into,:recipient_name_into,:address_into,:phone_number_into);",nativeQuery = true)
    Long createOrderForUser(@Param("user_id_into") Long userId,
                            @Param("recipient_name_into") String recipientName,
                            @Param("address_into") String address,
                            @Param("phone_number_into") String phoneNumber );


    List<AppOrder> findByUserAndFlagDeletedOrderByIdDesc(User user,Boolean flagDeleted);
}
