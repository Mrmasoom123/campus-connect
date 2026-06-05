package com.promit.campus_connect.controller;

import com.promit.campus_connect.model.User;
import com.promit.campus_connect.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/impact")
@CrossOrigin(origins = "http://localhost:3000")
public class ImpactController {

    private final UserService userService;

    public ImpactController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/mark/attendance")
    public ResponseEntity<?> markAttendance(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(401).body(Map.of("message", "Session expired. Please login again."));
        }

        String username = authentication.getName();
        // Updated to +10 points for Campus Vortex attendance
        User updatedUser = userService.incrementImpactScore(username, 10);

        if (updatedUser != null) {
            return ResponseEntity.ok(Map.of(
                    "message", "Presence Established! +10 Impact Points",
                    "score", updatedUser.getImpactScore()
            ));
        }
        return ResponseEntity.status(404).body(Map.of("message", "Student profile not found."));
    }
}