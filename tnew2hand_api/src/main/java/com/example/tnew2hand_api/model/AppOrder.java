package com.example.tnew2hand_api.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class AppOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "date")
    private String orderAs;
    @Column(columnDefinition = "varchar(150)")
    private String RecipientName;
    @Column(columnDefinition = "varchar(20)")
    private String phoneNumber;
    @Column(columnDefinition = "varchar(225)")
    private String address;
    private Boolean flagDeleted=false;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "appOrder")
    private List<OrderDetail> orderDetails;

    public AppOrder(String orderAs, String recipientName, String phoneNumber, String address, Boolean flagDeleted, User user) {
        this.orderAs = orderAs;
        RecipientName = recipientName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.flagDeleted = flagDeleted;
        this.user = user;
    }

    public AppOrder() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderAs() {
        return orderAs;
    }

    public void setOrderAs(String orderAs) {
        this.orderAs = orderAs;
    }

    public String getRecipientName() {
        return RecipientName;
    }

    public void setRecipientName(String recipientName) {
        RecipientName = recipientName;
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

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
