package com.example.tnew2hand_api.dto;

import com.example.tnew2hand_api.common.ValidateAppUser;
import com.example.tnew2hand_api.model.AppRole;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.Set;

public class AppUserDto implements Validator {
    private Long id;
    private String userName;
    private String password;
    private String confirmPassword;
    private Boolean flagDeleted;
    private Boolean flagOnline;
    private Set<AppRole> userRoleSet;

    public AppUserDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public Boolean getFlagOnline() {
        return flagOnline;
    }

    public void setFlagOnline(Boolean flagOnline) {
        this.flagOnline = flagOnline;
    }

    public Set<AppRole> getUserRoleSet() {
        return userRoleSet;
    }

    public void setUserRoleSet(Set<AppRole> userRoleSet) {
        this.userRoleSet = userRoleSet;
    }

    public AppUserDto(Long id, String userName, String password, String confirmPassword, Boolean flagDeleted, Boolean flagOnline, Set<AppRole> userRoleSet) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.flagDeleted = flagDeleted;
        this.flagOnline = flagOnline;
        this.userRoleSet = userRoleSet;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        AppUserDto appUserDto = (AppUserDto) target;
        ValidateAppUser.checkValidateAppUserName(appUserDto.getUserName(),errors);
        ValidateAppUser.checkValidateAppUserPassword(appUserDto.getPassword(),errors);
    }
}
