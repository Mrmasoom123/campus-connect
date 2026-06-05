package com.promit.campus_connect.controller;

import com.promit.campus_connect.model.Appointment;
import com.promit.campus_connect.model.Notification;
import com.promit.campus_connect.repository.AppointmentRepository;
import com.promit.campus_connect.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/all")
    public List<Appointment> getAll() {
        return appointmentRepository.findAll();
    }

    @PostMapping("/book")
    public Appointment book(@RequestBody Appointment appt) {
        return appointmentRepository.save(appt);
    }

    @PatchMapping("/{id}/status")
    public Appointment updateStatus(@PathVariable Long id, @RequestParam String status) {
        Appointment appt = appointmentRepository.findById(id).orElseThrow();
        appt.setStatus(status);

        Notification n = new Notification();
        n.setRecipientName(appt.getStudentName());
        n.setMessage("Your meeting for Room " + appt.getRoomNo() + " is " + status);
        notificationRepository.save(n);

        return appointmentRepository.save(appt);
    }

    @DeleteMapping("/{id}")
    public void deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
    }
}