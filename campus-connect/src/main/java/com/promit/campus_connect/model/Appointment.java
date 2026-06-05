package com.promit.campus_connect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Appointment Entity for Campus Connect
 * Tracks student-faculty meetings, locations, and impact rewards.
 */
@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false)
    private String facultyName;

    @Column(nullable = false)
    private String communityName;

    @Column(nullable = false)
    private String roomNo;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Column(length = 500)
    private String reason;

    // Default status is PENDING. Can be changed to APPROVED or DECLINED.
    @Column(nullable = false)
    private String status = "PENDING";

    // Integrated with your Student Impact Score system
    private int impactScoreReward = 10;

    // --- Constructors ---

    public Appointment() {
    }

    public Appointment(String studentName, String facultyName, String communityName,
                       String roomNo, LocalDateTime appointmentTime, String reason) {
        this.studentName = studentName;
        this.facultyName = facultyName;
        this.communityName = communityName;
        this.roomNo = roomNo;
        this.appointmentTime = appointmentTime;
        this.reason = reason;
    }

    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getFacultyName() {
        return facultyName;
    }

    public void setFacultyName(String facultyName) {
        this.facultyName = facultyName;
    }

    public String getCommunityName() {
        return communityName;
    }

    public void setCommunityName(String communityName) {
        this.communityName = communityName;
    }

    public String getRoomNo() {
        return roomNo;
    }

    public void setRoomNo(String roomNo) {
        this.roomNo = roomNo;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getImpactScoreReward() {
        return impactScoreReward;
    }

    public void setImpactScoreReward(int impactScoreReward) {
        this.impactScoreReward = impactScoreReward;
    }
}