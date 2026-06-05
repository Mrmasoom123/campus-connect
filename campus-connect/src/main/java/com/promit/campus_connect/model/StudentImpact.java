package com.promit.campus_connect.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "student_impact")
@Data
public class StudentImpact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String fullName;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "impact_score")
    private int impactPoints;
}