package com.bxconnect.backend.controller;

import com.bxconnect.backend.model.Admin;
import com.bxconnect.backend.repository.AdminRepository;
import com.bxconnect.backend.security.JwtService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AdminRepository adminRepository;
    private final JwtService jwtService;

    public AuthController(AdminRepository adminRepository, JwtService jwtService) {
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Admin admin) {
        Map<String, Object> response = new HashMap<>();

        Optional<Admin> adminTrouve =
                adminRepository.findByEmail(admin.getEmail());

        if (adminTrouve.isPresent()
                && adminTrouve.get().getMotDePasse().equals(admin.getMotDePasse())) {

            String token = jwtService.generateToken(admin.getEmail(), "ADMIN");

            response.put("success", true);
            response.put("message", "Connexion réussie");
            response.put("token", token);
            response.put("role", "ADMIN");
        } else {
            response.put("success", false);
            response.put("message", "Email ou mot de passe incorrect");
        }

        return response;
    }
}