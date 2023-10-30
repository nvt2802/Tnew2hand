package com.example.tnew2hand_api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "varchar(50)")
    private String userName;
    @Column(columnDefinition = "varchar(255)")
    private String password;
    private Boolean flagDeleted=false;
    @OneToMany(mappedBy = "appUser")
    @JsonBackReference
    private List<UserRole> userRole;

    public AppUser(String userName, String password, Boolean flagDeleted) {
        this.userName = userName;
        this.password = password;
        this.flagDeleted = flagDeleted;
    }

    public AppUser() {
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public List<UserRole> getUserRole() {
        return userRole;
    }

    public void setUserRole(List<UserRole> userRole) {
        this.userRole = userRole;
    }
}
