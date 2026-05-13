package com.bxconnect.backend.controller;

import com.bxconnect.backend.entity.User;
import com.bxconnect.backend.repository.UserRepository;
import com.bxconnect.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(
            UserRepository userRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User loginRequest) {

        Map<String, Object> response = new HashMap<>();

        Optional<User> userOptional =
                userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {

            response.put("success", false);
            response.put("message", "Utilisateur introuvable");

            return response;
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(
                loginRequest.getMotDePasse(),
                user.getMotDePasse()
        )) {

            response.put("success", false);
            response.put("message", "Mot de passe incorrect");

            return response;
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole()
        );

        response.put("success", true);
        response.put("token", token);
        response.put("role", user.getRole());
        response.put("nom", user.getNom());

        return response;
    }
}