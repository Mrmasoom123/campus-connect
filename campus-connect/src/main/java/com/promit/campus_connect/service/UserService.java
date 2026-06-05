package com.promit.campus_connect.service;

import com.promit.campus_connect.model.User;
import com.promit.campus_connect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ FIXED: Method name now matches the Controller call
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // Keep this for internal logic/Bond Bridge
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Transactional
    public User incrementImpactScore(String username, int points) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            user.setImpactScore(user.getImpactScore() + points);
            return userRepository.saveAndFlush(user);
        }
        return null;
    }

    public List<User> getTopUsersByImpact() {
        return userRepository.findTop10ByOrderByImpactScoreDesc();
    }

    public List<User> getAllStudentsForFaculty() {
        return userRepository.findAllByRole(User.UserRole.STUDENT);
    }
}