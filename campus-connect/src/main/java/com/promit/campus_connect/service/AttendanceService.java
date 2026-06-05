package com.promit.campus_connect.service;

import com.promit.campus_connect.model.User;
import com.promit.campus_connect.model.AttendanceLog;
import com.promit.campus_connect.repository.UserRepository;
import com.promit.campus_connect.repository.AttendanceLogRepository;
import com.promit.campus_connect.util.LocationUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final UserRepository userRepository;
    private final AttendanceLogRepository logRepository;

    private static final double CAMPUS_LAT = 26.8236;
    private static final double CAMPUS_LON = 75.8652;
    private static final double ALLOWED_RADIUS = 250.0;

    public AttendanceService(UserRepository userRepository, AttendanceLogRepository logRepository) {
        this.userRepository = userRepository;
        this.logRepository = logRepository;
    }

    @Transactional
    public void processAttendance(String username, double userLat, double userLon) {
        // 1. Fetch Student
        User student = userRepository.findByUsername(username);
        if (student == null) {
            throw new RuntimeException("Student not found in Vortex");
        }

        // 2. Anti-Spam: Check if already marked today
        boolean alreadyMarked = logRepository.existsByUsernameAndDate(username, LocalDate.now());
        if (alreadyMarked) {
            throw new RuntimeException("Attendance already verified for today!");
        }

        // 3. Distance Calculation
        double distance = LocationUtils.calculateDistance(userLat, userLon, CAMPUS_LAT, CAMPUS_LON);

        if (distance <= ALLOWED_RADIUS) {
            // 4. Save to AttendanceLog
            AttendanceLog successLog = new AttendanceLog(
                    username,
                    LocalDateTime.now(),
                    "VERIFIED",
                    distance
            );
            logRepository.save(successLog);

            // 5. UPDATE IMPACT SCORES (Database Table & Entity Sync)
            // This hits the native 'impact_scores' table we debugged
            int rowsUpdated = userRepository.incrementImpactScore(username);
            if (rowsUpdated == 0) {
                userRepository.seedImpactScore(username);
            }

            // Sync the User entity and flush to main 'users' table
            student.setImpactScore(student.getImpactScore() + 10);
            userRepository.saveAndFlush(student);

        } else {
            // 6. Log failure but still save the attempt for admin review
            logRepository.save(new AttendanceLog(username, LocalDateTime.now(), "FAILED_OUT_OF_RANGE", distance));
            throw new RuntimeException("Radar check failed! You are " + (int)distance + "m away.");
        }
    }

    public List<AttendanceLog> getAllAttendanceLogs() {
        return logRepository.findAll();
    }
}