package com.example.tnew2hand_api.dto;

import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class UserDto implements Validator {
    private String name;
    private String phoneNumber;
    private String address;
    private String note;
    private String dob;
    private String email;
    private Integer weight;
    private Double height;

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Double getHeight() {
        return height;
    }

    public void setHeight(Double height) {
        this.height = height;
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

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public UserDto() {
    }

    public UserDto(String name, String phoneNumber, String address, String note) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.note = note;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {
        UserDto userDto = (UserDto) target;
        final String Name = "name";
        if (userDto.getName() == null) {
            errors.rejectValue(Name, "", "Please input name");
        } else if (userDto.getName().length() > 50) {
            errors.rejectValue(Name, "", "Too many characters allowed");
        } else if (!userDto.getName().matches("^[\\p{L}\\s]+$")) {
            errors.rejectValue(Name, "", "The name contains only letter format");
        }

        final String ADDRESS = "address";
        if (userDto.getAddress() == null) {
            errors.rejectValue(ADDRESS, "", "Please enter your address");
        } else if (userDto.getAddress().length() > 100) {
            errors.rejectValue(ADDRESS, "", "The address exceeds the allowed characters");
        }
        final String PHONE_NUMBER= "phoneNumber";
        if (userDto.getPhoneNumber() == null) {
            errors.rejectValue(PHONE_NUMBER, "", "Please enter the phone number");
        } else if (!userDto.getPhoneNumber().matches("^\\d{5,10}$")) {
            errors.rejectValue(PHONE_NUMBER, "", "Wrong format");
        }
    }
}
