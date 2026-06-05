package com.promit.campus_connect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "attendance_logs") // Maps to your MySQL table
public class AttendanceLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private LocalDateTime checkInTime;

    @Column(name = "check_out_time")
    private LocalDateTime checkOutTime;

    @Column(nullable = false)
    private String status;

    @Column(name = "distance_from_center")
    private double distanceFromCenter;

    @Column(name = "total_minutes")
    private Integer totalMinutes;

    // Default Constructor
    public AttendanceLog() {}

    // Parameterized Constructor
    public AttendanceLog(String username, LocalDateTime checkInTime, String status, double distanceFromCenter) {
        this.username = username;
        this.checkInTime = checkInTime;
        this.status = status;
        this.distanceFromCenter = distanceFromCenter;
    }

    // Getters with JsonProperty to match Next.js keys

    public Long getId() {
        return id;
    }

    @JsonProperty("student_name")
    public String getUsername() {
        return username;
    }

    @JsonProperty("timestamp")
    public LocalDateTime getCheckInTime() {
        return checkInTime;
    }

    @JsonProperty("check_out_time")
    public LocalDateTime getCheckOutTime() {
        return checkOutTime;
    }

    public String getStatus() {
        return status;
    }

    @JsonProperty("distance_m")
    public double getDistanceFromCenter() {
        return distanceFromCenter;
    }

    @JsonProperty("total_minutes")
    public Integer getTotalMinutes() {
        return totalMinutes;
    }

    // Setters

    public void setId(Long id) { this.id = id; }
    public void setUsername(String username) { this.username = username; }
    public void setCheckInTime(LocalDateTime checkInTime) { this.checkInTime = checkInTime; }
    public void setCheckOutTime(LocalDateTime checkOutTime) { this.checkOutTime = checkOutTime; }
    public void setStatus(String status) { this.status = status; }
    public void setDistanceFromCenter(double distanceFromCenter) { this.distanceFromCenter = distanceFromCenter; }
    public void setTotalMinutes(Integer totalMinutes) { this.totalMinutes = totalMinutes; }
}