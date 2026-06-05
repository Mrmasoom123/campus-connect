package com.promit.campus_connect.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String uid;          // e.g., STU2026_PROM

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String username;     // For Login

    @Column(unique = true, nullable = false)
    private String email;

    private String password;
    private String branch;       // Updated from department
    private String course;       // e.g., B.Tech
    private String contact;
    private String committee;    // e.g., Technical Club
    private Integer impactScore = 0;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private String geoPoint;

    public enum UserRole {
        STUDENT, FACULTY, ADMIN, COMMITTEE_MEMBER
    }

    public User() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getBranch() { return branch; }
    public void setBranch(String branch) { this.branch = branch; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getCommittee() { return committee; }
    public void setCommittee(String committee) { this.committee = committee; }

    public int getImpactScore() { return impactScore; }
    public void setImpactScore(int impactScore) { this.impactScore = impactScore; }

    public UserRole getRole() { return role; }
    public void setRole(UserRole role) { this.role = role; }

    public String getGeoPoint() { return geoPoint; }
    public void setGeoPoint(String geoPoint) { this.geoPoint = geoPoint; }
}