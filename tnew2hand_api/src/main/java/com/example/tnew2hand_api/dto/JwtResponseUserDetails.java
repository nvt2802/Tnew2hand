package com.example.retro_care.user.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * class: JwtResponseUserDetails
 * Creater: NhatNHH
 * Date: 15-09-2023
 * Function: output data when login success
 */
public class JwtResponseUserDetails implements UserDetails {
    private String username;
    private String password;
    private Boolean online;
    private Collection<? extends GrantedAuthority> authorities;

    public JwtResponseUserDetails() {
    }

    public JwtResponseUserDetails( String username, String password, Boolean online, Collection<? extends GrantedAuthority> authorities) {

        this.username = username;
        this.password = password;
        this.online = online;
        this.authorities = authorities;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getOnline() {
        return online;
    }

    public void setOnline(Boolean online) {
        this.online = online;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
