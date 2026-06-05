package com.promit.campus_connect.repository;

import com.promit.campus_connect.model.AttendanceLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface AttendanceLogRepository extends JpaRepository<AttendanceLog, Long> {

    // Logic: Matches your DB column 'check_in_time'
    @Query("SELECT COUNT(a) > 0 FROM AttendanceLog a WHERE a.username = :username AND CAST(a.checkInTime AS date) = :selectedDate")
    boolean existsByUsernameAndDate(
            @Param("username") String username,
            @Param("selectedDate") LocalDate selectedDate
    );
}