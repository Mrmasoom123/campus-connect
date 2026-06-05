package com.promit.campus_connect.controller;

import com.promit.campus_connect.model.AttendanceLog;
import com.promit.campus_connect.payload.request.AttendanceRequest;
import com.promit.campus_connect.service.AttendanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    // 1. STUDENT MARKING ENDPOINT
    @PostMapping("/mark")
    public ResponseEntity<?> markPresence(@RequestBody AttendanceRequest request) {
        if (request.getUsername() == null || request.getUsername().isEmpty()) {
            return ResponseEntity.status(400).body(Map.of("success", false, "message", "Student ID is missing!"));
        }

        try {
            attendanceService.processAttendance(
                    request.getUsername(),
                    request.getLatitude(),
                    request.getLongitude()
            );
            return ResponseEntity.ok(Map.of("success", true, "message", "Presence Established in Campus Vortex!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(Map.of("success", false, "message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "System glitch: " + e.getMessage()));
        }
    }

    // 2. TEACHER AUDIT ENDPOINT
    @GetMapping("/logs")
    public ResponseEntity<List<AttendanceLog>> getAllLogs() {
        return ResponseEntity.ok(attendanceService.getAllAttendanceLogs());
    }
}