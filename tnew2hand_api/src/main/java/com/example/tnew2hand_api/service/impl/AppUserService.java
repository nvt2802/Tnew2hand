package com.example.tnew2hand_api.service.impl;

import com.example.tnew2hand_api.dto.JwtResponseUserDetails;
import com.example.tnew2hand_api.model.AppRole;
import com.example.tnew2hand_api.model.AppUser;
import com.example.tnew2hand_api.model.User;
import com.example.tnew2hand_api.model.UserRole;
import com.example.tnew2hand_api.repository.IAppRoleRepository;
import com.example.tnew2hand_api.repository.IAppUserRepository;
import com.example.tnew2hand_api.repository.IUserRepository;
import com.example.tnew2hand_api.repository.IUserRoleRepository;
import com.example.tnew2hand_api.service.IAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppUserService implements IAppUserService {
    @Autowired
    private IAppUserRepository appUserRepository;
    @Autowired
    private IUserRoleRepository userRoleRepository;
    @Autowired
    private IAppRoleRepository appRoleRepository;
    @Autowired
    private IUserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUserName(username);
        if (appUser == null) {
            throw new UsernameNotFoundException("User name or password is wrong");
        }

        List<GrantedAuthority> grantList = new ArrayList<>();
        for (UserRole appRole : appUser.getUserRole()) {
            grantList.add(new SimpleGrantedAuthority(appRole.getAppRole().getName()));
        }
        return new JwtResponseUserDetails(
                appUser.getUserName(),
                appUser.getPassword(),
                grantList);
    }

    @Override
    public boolean existsByUsername(String userName) {
        return appUserRepository.findByUserName(userName)!=null;
    }


    @Override
    public void saveAppUser(AppUser appUser) {
        appUser.setFlagDeleted(false);
        appUserRepository.save(appUser);
        User user = new User();
        user.setAppUser(appUser);
        userRepository.save(user);
        AppRole appRole = appRoleRepository.findById(1L).orElse(null);
        UserRole userRole = new UserRole(false,appRole,appUser);
        userRoleRepository.save(userRole);
    }

    @Override
    public AppUser getByUserName(String userName) {
        return appUserRepository.findByUserName(userName);
    }
}
