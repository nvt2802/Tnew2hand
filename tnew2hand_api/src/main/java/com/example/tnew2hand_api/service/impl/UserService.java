package com.example.tnew2hand_api.service.impl;

import com.example.tnew2hand_api.model.AppUser;
import com.example.tnew2hand_api.model.User;
import com.example.tnew2hand_api.repository.IAppUserRepository;
import com.example.tnew2hand_api.repository.IUserRepository;
import com.example.tnew2hand_api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private IAppUserRepository appUserRepository;
    @Override
    public User getByUserName(String userName) {
        AppUser appUser = appUserRepository.findByUserName(userName);
        return userRepository.findByAppUserAndFlagDeleted(appUser,false);
    }

    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
