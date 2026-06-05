package com.promit.campus_connect.payload.request;

public class AttendanceRequest {
    private String username;
    private double latitude;
    private double longitude;

    // 1. CRITICAL: Add this empty constructor!
    public AttendanceRequest() {
    }

    // 2. All Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
}