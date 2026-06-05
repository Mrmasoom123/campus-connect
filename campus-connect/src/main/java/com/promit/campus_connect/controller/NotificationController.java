package com.promit.campus_connect.controller;

import com.promit.campus_connect.model.Notification;
import com.promit.campus_connect.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    // Fetch all notifications for a specific student/faculty
    @GetMapping("/{name}")
    public List<Notification> getNotifications(@PathVariable String name) {
        // This will fetch the messages like "Your meeting in Room 102 has been APPROVED"
        return notificationRepository.findByRecipientNameOrderByTimestampDesc(name);
    }

    // Mark a notification as read when the user clicks the bell icon
    @PatchMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        Notification notification = notificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    // Delete a notification
    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Long id) {
        notificationRepository.deleteById(id);
    }
}