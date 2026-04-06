package com.bxconnect.backend.controller;

import com.bxconnect.backend.entity.Activity;
import com.bxconnect.backend.entity.Registration;
import com.bxconnect.backend.entity.User;
import com.bxconnect.backend.model.RegistrationRequest;
import com.bxconnect.backend.service.ActivityService;
import com.bxconnect.backend.service.RegistrationService;
import com.bxconnect.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserService userService;
    private final ActivityService activityService;

    public RegistrationController(
            RegistrationService registrationService,
            UserService userService,
            ActivityService activityService
    ) {
        this.registrationService = registrationService;
        this.userService = userService;
        this.activityService = activityService;
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(@PathVariable Long id) {
        return registrationService.getRegistrationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createRegistration(@RequestBody RegistrationRequest request) {
        Optional<User> userOptional = userService.getUserById(request.getUserId());
        Optional<Activity> activityOptional = activityService.getActivityById(request.getActivityId());

        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Utilisateur introuvable");
        }

        if (activityOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Activité introuvable");
        }

        if (registrationService.existsByUserAndActivity(userOptional.get(), activityOptional.get())) {
            return ResponseEntity.badRequest().body("Vous êtes déjà inscrit à cette activité");
        }

        Registration registration = new Registration();
        registration.setUser(userOptional.get());
        registration.setActivity(activityOptional.get());
        registration.setDateInscription(LocalDateTime.now());

        registrationService.saveRegistration(registration);

        return ResponseEntity.ok("Inscription enregistrée avec succès");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(@PathVariable Long id) {
        if (registrationService.getRegistrationById(id).isPresent()) {
            registrationService.deleteRegistration(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}