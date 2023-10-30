package com.example.tnew2hand_api.service;

import com.example.tnew2hand_api.model.User;

public interface IUserService {
    User getByUserName(String userName);

    User update(User user);

    User getById(Long id);
}
