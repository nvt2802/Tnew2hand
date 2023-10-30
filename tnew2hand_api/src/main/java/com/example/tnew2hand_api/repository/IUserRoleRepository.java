package com.example.tnew2hand_api.repository;

import com.example.tnew2hand_api.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRoleRepository extends JpaRepository<UserRole,Long> {
}
