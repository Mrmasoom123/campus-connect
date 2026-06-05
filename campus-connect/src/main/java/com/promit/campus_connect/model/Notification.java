package com.promit.campus_connect.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String recipientName; // This matches setRecipientName
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();
    private boolean isRead = false;

    // --- Constructors ---
    public Notification() {}

    public Notification(String recipientName, String message) {
        this.recipientName = recipientName;
        this.message = message;
    }

    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRecipientName() { return recipientName; }

    // THIS IS THE MISSING SYMBOL FIX:
    public void setRecipientName(String recipientName) {
        this.recipientName = recipientName;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean isRead) { this.isRead = isRead; }
}