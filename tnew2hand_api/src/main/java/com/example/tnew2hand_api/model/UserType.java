package com.example.tnew2hand_api.model;

import javax.persistence.*;
@Entity
public class UserType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "varchar(25)")
    private String name;
    private Boolean flagDeleted=false;
//    @OneToMany(mappedBy = "userType")
//    @JacksonInject
//    private List<User> userList;

    public UserType(String name, Boolean flagDeleted) {
        this.name = name;
        this.flagDeleted = flagDeleted;
    }

    public UserType(Long id, String name, Boolean flagDeleted) {
        this.id = id;
        this.name = name;
        this.flagDeleted = flagDeleted;
    }

    public UserType() {
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

//    public List<User> getUserList() {
//        return userList;
//    }
//
//    public void setUserList(List<User> userList) {
//        this.userList = userList;
//    }
}
