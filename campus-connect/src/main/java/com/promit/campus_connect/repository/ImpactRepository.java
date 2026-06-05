package com.promit.campus_connect.repository;

import com.promit.campus_connect.model.StudentImpact;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface ImpactRepository extends JpaRepository<StudentImpact, Long> {

    // Required for the incrementImpactScore logic in your screenshot
    Optional<StudentImpact> findByUsername(String username);

    // Required for the leaderboard
    List<StudentImpact> findAllByOrderByImpactPointsDesc();
}