package com.promit.campus_connect.repository;

import com.promit.campus_connect.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Standard lookups
    List<Appointment> findByStudentName(String studentName);
    List<Appointment> findByFacultyName(String facultyName);

    // CRITICAL: Filter by Status for Faculty Dashboards
    List<Appointment> findByFacultyNameAndStatus(String facultyName, String status);

    // LOGIC: Get upcoming appointments sorted by time
    List<Appointment> findByStudentNameOrderByAppointmentTimeAsc(String studentName);
}