package com.promit.campus_connect.repository;

import com.promit.campus_connect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 1. Authentication Lookups (Switching to Email)
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

    // Keep username for internal logic/profiles
    User findByUsername(String username);

    // 2. Dynamic Filtering & Leaderboard
    List<User> findByCommittee(String committee);
    List<User> findTop10ByOrderByImpactScoreDesc();

    // 3. Role-Based Queries (Hibernate 6 compatible)
    @Query("SELECT u FROM User u WHERE u.role = :role")
    List<User> findAllByRole(@Param("role") User.UserRole role);

    @Query("SELECT u FROM User u WHERE u.impactScore > 0 AND u.role = :role")
    List<User> findActiveStudentsForRadar(@Param("role") User.UserRole role);

    // 4. BOND BRIDGE POINT LOGIC (Native Queries)
    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET impact_score = impact_score + 10 WHERE username = :username", nativeQuery = true)
    int incrementImpactScore(@Param("username") String username);

    @Modifying
    @Transactional
    @Query(value = "INSERT IGNORE INTO impact_scores (student_name, score) VALUES (?, 10)", nativeQuery = true)
    void seedImpactScore(String username);
}