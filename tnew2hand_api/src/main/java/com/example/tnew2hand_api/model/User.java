package com.example.tnew2hand_api.model;

import javax.persistence.*;
import java.util.List;
@Entity
public class User {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "varchar(150)")
    private String name;
    @Column(columnDefinition = "varchar(20)")
    private String phoneNumber;
    @Column(columnDefinition = "varchar(225)")
    private String address;
    @Column(columnDefinition = "date")
    private String dob;
    private Boolean flagDeleted=false;
    @OneToOne
    @JoinColumn(name = "app_user_id")
    private AppUser appUser;
    @ManyToOne
    @JoinColumn(name="user_type_id")
    private UserType userType;
    @OneToMany(mappedBy = "user")
    private List<AppOrder> appOrderList;
    @OneToMany(mappedBy = "user")
    private List<CartItem> cartItems;

    public User(String name, String phoneNumber, String address, String dob, Boolean flagDeleted, AppUser appUser, UserType userType) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.dob = dob;
        this.flagDeleted = flagDeleted;
        this.appUser = appUser;
        this.userType = userType;
    }

    public User() {
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

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public AppUser getAppUser() {
        return appUser;
    }

    public void setAppUser(AppUser appUser) {
        this.appUser = appUser;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public List<AppOrder> getAppOrderList() {
        return appOrderList;
    }

    public void setAppOrderList(List<AppOrder> appOrderList) {
        this.appOrderList = appOrderList;
    }

    public List<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
}
