package com.promit.campus_connect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private double latitude;
    private double longitude;
    private LocalDateTime timestamp;

    public Attendance() {} // Required by Hibernate

    public Attendance(String username, double latitude, double longitude) {
        this.username = username;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters (Omitted for brevity, but add them!)
}