package com.bxconnect.backend.controller;

import com.bxconnect.backend.model.Admin;
import com.bxconnect.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Admin admin) {
        Map<String, Object> response = new HashMap<>();

        Optional<Admin> adminTrouve = adminRepository.findByEmail(admin.getEmail());

        if (adminTrouve.isPresent() &&
                adminTrouve.get().getMotDePasse().equals(admin.getMotDePasse())) {
            response.put("success", true);
            response.put("message", "Connexion réussie");
        } else {
            response.put("success", false);
            response.put("message", "Email ou mot de passe incorrect");
        }

        return response;
    }
}