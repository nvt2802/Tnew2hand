package com.example.tnew2hand_api.model;

import javax.persistence.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "varchar(100)")
    private String name;
    @Column(columnDefinition = "varchar(20)")
    private String size;
    @Column(columnDefinition = "varchar(350)")
    private String description;
    @Column(columnDefinition = "longtext")
    private String img;
    private Double price;
    private Integer quantity;
    private Boolean flagDeleted=false;
//    @OneToMany(mappedBy = "product")
//    @JacksonInject
//    private List<OrderDetail> orderDetails;
//    @OneToMany(mappedBy = "product")
//    @JacksonInject
//    private List<CartItem> cartItems;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public Product(String name, String size, String description, String img, Double price, Integer quantity, Boolean flagDeleted, Category category) {
        this.name = name;
        this.size = size;
        this.description = description;
        this.img = img;
        this.price = price;
        this.quantity = quantity;
        this.flagDeleted = flagDeleted;
        this.category = category;
    }

    public Product() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
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

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean getFlagDeleted() {
        return flagDeleted;
    }

    public void setFlagDeleted(Boolean flagDeleted) {
        this.flagDeleted = flagDeleted;
    }

//    public List<OrderDetail> getOrderDetails() {
//        return orderDetails;
//    }
//
//    public void setOrderDetails(List<OrderDetail> orderDetails) {
//        this.orderDetails = orderDetails;
//    }
//
//    public List<CartItem> getCartItems() {
//        return cartItems;
//    }
//
//    public void setCartItems(List<CartItem> cartItems) {
//        this.cartItems = cartItems;
//    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
