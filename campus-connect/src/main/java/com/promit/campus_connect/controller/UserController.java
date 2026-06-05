package com.promit.campus_connect.controller;

import com.promit.campus_connect.model.User;
import com.promit.campus_connect.repository.UserRepository;
import com.promit.campus_connect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    // --- SHARED DATA ---

    @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard() {
        return ResponseEntity.ok(userRepository.findTop10ByOrderByImpactScoreDesc());
    }

    // --- STUDENT DASHBOARD ENDPOINTS ---

    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getStudentProfile(@PathVariable String username) {
        User user = userService.findByUsername(username);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @GetMapping("/radar-active")
    public ResponseEntity<List<User>> getActiveRadarUsers() {
        // Corrected to use the new repository method name
        return ResponseEntity.ok(userRepository.findActiveStudentsForRadar(User.UserRole.STUDENT));
    }

    // --- FACULTY DASHBOARD ENDPOINTS ---

    @GetMapping("/all-students")
    public ResponseEntity<List<User>> getAllStudents() {
        // Corrected to use the new repository method name
        return ResponseEntity.ok(userRepository.findAllByRole(User.UserRole.STUDENT));
    }

    @GetMapping("/committee/{committeeName}")
    public ResponseEntity<List<User>> getStudentsByCommittee(@PathVariable String committeeName) {
        return ResponseEntity.ok(userRepository.findByCommittee(committeeName));
    }
}