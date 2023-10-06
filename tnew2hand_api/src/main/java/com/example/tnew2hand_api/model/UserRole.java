package com.example.tnew2hand_api.model;

import javax.persistence.*;

@Entity
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean flagDeleted=false;
    @ManyToOne
    @JoinColumn(name = "app_role_id")
    private AppRole appRole;
    @ManyToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;

    public UserRole(Boolean flagDeleted, AppRole appRole, AppUser appUser) {
        this.flagDeleted = flagDeleted;
        this.appRole = appRole;
        this.appUser = appUser;
    }

    public UserRole() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public AppRole getAppRole() {
        return appRole;
    }

    public void setAppRole(AppRole appRole) {
        this.appRole = appRole;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }
}
