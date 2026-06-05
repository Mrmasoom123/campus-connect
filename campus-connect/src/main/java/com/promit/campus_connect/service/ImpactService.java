package com.promit.campus_connect.service;

import com.promit.campus_connect.model.StudentImpact;
import com.promit.campus_connect.repository.ImpactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ImpactService {

    @Autowired
    private ImpactRepository impactRepository;

    // 1. Leaderboard: Fetches top users by points
    public List<StudentImpact> getLeaderboard() {
        return impactRepository.findAllByOrderByImpactPointsDesc();
    }

    // 2. NEW: Update Points for Attendance (Matches GPS Dashboard logic)
    public StudentImpact incrementImpactScore(String username, int points) {
        // Assuming your repository has findByUsername or findByStudentName
        Optional<StudentImpact> impactRecord = impactRepository.findByUsername(username);

        if (impactRecord.isPresent()) {
            StudentImpact record = impactRecord.get();
            record.setImpactPoints(record.getImpactPoints() + points);
            return impactRepository.save(record); // Persists update to DB
        }
        return null;
    }
}