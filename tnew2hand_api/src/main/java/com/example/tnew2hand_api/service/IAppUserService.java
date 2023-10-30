package com.example.tnew2hand_api.service;

import com.example.tnew2hand_api.model.AppUser;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface IAppUserService extends UserDetailsService {
    boolean existsByUsername(String userName);

    void saveAppUser(AppUser appUser);
    AppUser getByUserName(String userName);
}
