package com.promit.campus_connect.config;

import com.promit.campus_connect.model.User;
import com.promit.campus_connect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository; // Fixed: Removed the accidental 'run' keyword

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {

            // 1. Create a Faculty User
            User faculty = new User();
            faculty.setFullName("Dr. Sharma");
            faculty.setUsername("Dr_Sharma");
            faculty.setEmail("sharma@icfai.edu");
            faculty.setPassword("faculty123");
            faculty.setImpactScore(100);
            faculty.setRole(User.UserRole.FACULTY);
            faculty.setBranch("Computer Science");
            faculty.setGeoPoint("26.9124,75.7873");
            userRepository.save(faculty);

            // 2. Create an Admin/Committee User
            User committee = new User();
            committee.setFullName("Admin Vortex");
            committee.setUsername("Admin_Vortex");
            committee.setEmail("admin@vortex.com");
            committee.setPassword("admin123");
            committee.setImpactScore(0);
            committee.setRole(User.UserRole.ADMIN);
            committee.setCommittee("Logistics");
            committee.setGeoPoint("26.9200,75.7900");
            userRepository.save(committee);

            System.out.println("✅ Vortex Data Initialization Complete: Users Created.");
        }
    }
}