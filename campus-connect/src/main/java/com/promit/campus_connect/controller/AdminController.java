package com.promit.campus_connect.controller;

import com.promit.campus_connect.model.AttendanceLog;
import com.promit.campus_connect.repository.AttendanceLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AttendanceLogRepository attendanceLogRepository;

    @GetMapping("/log")
    public List<AttendanceLog> getAllLogs() {
        return attendanceLogRepository.findAll();
    }
}