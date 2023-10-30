package com.example.tnew2hand_api.repository;

import com.example.tnew2hand_api.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IAppUserRepository extends JpaRepository<AppUser,Integer> {
    AppUser findByUserName(String userName);
}
