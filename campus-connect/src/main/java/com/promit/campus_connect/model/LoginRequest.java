package com.promit.campus_connect.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}