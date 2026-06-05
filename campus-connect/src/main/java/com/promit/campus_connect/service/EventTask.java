package com.promit.campus_connect.service;

import com.promit.campus_connect.model.Event;
import com.promit.campus_connect.model.EventStatus;
import com.promit.campus_connect.repository.EventRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class EventTask {

    private final EventRepository eventRepository;

    public EventTask(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Scheduled(cron = "0 * * * * *") // Runs every minute
    @Transactional
    public void checkEventStatus() {
        LocalDateTime now = LocalDateTime.now();
        List<Event> events = eventRepository.findAll();

        for (Event event : events) {
            // Logic: Set ONGOING if current time is within bounds
            if (now.isAfter(event.getStartTime()) && now.isBefore(event.getEndTime())) {
                event.setStatus(EventStatus.ONGOING);
            }
            // Logic: Set COMPLETED if current time passed the end time
            else if (now.isAfter(event.getEndTime())) {
                event.setStatus(EventStatus.COMPLETED);
            }
        }

        // Batch save to improve performance
        eventRepository.saveAll(events);
        System.out.println("Campus Connect: Statuses synced at " + now);
    }
}