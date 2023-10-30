package com.example.tnew2hand_api.repository;

import com.example.tnew2hand_api.model.AppUser;
import com.example.tnew2hand_api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User,Long> {
    User findByAppUserAndFlagDeleted(AppUser user, Boolean flagDeleted);
}
