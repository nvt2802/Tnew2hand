package com.example.tnew2hand_api.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer quantity;
    private Double price;
    private Boolean flagDeleted=false;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "app_order_id")
    private AppOrder appOrder;
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public OrderDetail(Integer quantity, Double price, Boolean flagDeleted, AppOrder appOrder, Product product) {
        this.quantity = quantity;
        this.price = price;
        this.flagDeleted = flagDeleted;
        this.appOrder = appOrder;
        this.product = product;
    }

    public OrderDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

    public AppOrder getAppOrder() {
        return appOrder;
    }

    public void setAppOrder(AppOrder appOrder) {
        this.appOrder = appOrder;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
