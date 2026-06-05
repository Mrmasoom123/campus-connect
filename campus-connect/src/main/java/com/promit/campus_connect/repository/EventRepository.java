package com.promit.campus_connect.repository;

import com.promit.campus_connect.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    // We are keeping this simple for now.
    // The main logic has moved to the Service layer for better GPS precision.
}