package com.promit.campus_connect.controller;

import com.promit.campus_connect.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LeaderboardController {
    private final UserService userService;

    public LeaderboardController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/leaderboard")
    public String viewLeaderboard(Model model) {
        model.addAttribute("users", userService.getTopUsersByImpact());
        return "leaderboard";
    }
}