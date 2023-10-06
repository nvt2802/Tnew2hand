package com.example.tnew2hand_api.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "varchar(25)")
    private String name;
    private Boolean flagDeleted=false;
    @OneToMany(mappedBy = "appRole")
    private List<UserRole> userRole;

    public AppRole(String name, Boolean flagDeleted) {
        this.name = name;
        this.flagDeleted = flagDeleted;
    }

    public AppRole() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
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
