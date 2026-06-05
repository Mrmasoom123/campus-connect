package com.promit.campus_connect.repository;

import com.promit.campus_connect.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // Custom query to find alerts for a specific user, newest first
    List<Notification> findByRecipientNameOrderByTimestampDesc(String recipientName);
}