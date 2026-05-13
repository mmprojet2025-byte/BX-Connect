package com.bxconnect.backend.controller;

import com.bxconnect.backend.entity.Activity;
import com.bxconnect.backend.entity.Registration;
import com.bxconnect.backend.entity.User;
import com.bxconnect.backend.model.RegistrationRequest;
import com.bxconnect.backend.security.JwtService;
import com.bxconnect.backend.service.ActivityService;
import com.bxconnect.backend.service.RegistrationService;
import com.bxconnect.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/registrations")
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService registrationService;
    private final UserService userService;
    private final ActivityService activityService;
    private final JwtService jwtService;

    public RegistrationController(
            RegistrationService registrationService,
            UserService userService,
            ActivityService activityService,
            JwtService jwtService
    ) {
        this.registrationService = registrationService;
        this.userService = userService;
        this.activityService = activityService;
        this.jwtService = jwtService;
    }

    @GetMapping
    public List<Registration> getAllRegistrations() {
        return registrationService.getAllRegistrations();
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyRegistrations(
            @RequestHeader("Authorization") String authorizationHeader
    ) {

        if (authorizationHeader == null
                || !authorizationHeader.startsWith("Bearer ")) {

            return ResponseEntity
                    .badRequest()
                    .body("Token manquant ou invalide");
        }

        String token = authorizationHeader.substring(7);

        String email = jwtService.extractEmail(token);

        Optional<User> userOptional =
                userService.getUserByEmail(email);

        if (userOptional.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Utilisateur introuvable");
        }

        User user = userOptional.get();

        List<Registration> registrations =
                registrationService.getRegistrationsByUser(user);

        return ResponseEntity.ok(registrations);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registration> getRegistrationById(
            @PathVariable Long id
    ) {

        return registrationService.getRegistrationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createRegistration(
            @RequestBody RegistrationRequest request,
            @RequestHeader("Authorization") String authorizationHeader
    ) {

        if (authorizationHeader == null
                || !authorizationHeader.startsWith("Bearer ")) {

            return ResponseEntity
                    .badRequest()
                    .body("Token manquant ou invalide");
        }

        String token = authorizationHeader.substring(7);

        String email = jwtService.extractEmail(token);

        Optional<User> userOptional =
                userService.getUserByEmail(email);

        Optional<Activity> activityOptional =
                activityService.getActivityById(
                        request.getActivityId()
                );

        if (userOptional.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Utilisateur introuvable");
        }

        if (activityOptional.isEmpty()) {

            return ResponseEntity
                    .badRequest()
                    .body("Activité introuvable");
        }

        User user = userOptional.get();

        Activity activity = activityOptional.get();

        if (registrationService.existsByUserAndActivity(
                user,
                activity
        )) {

            return ResponseEntity
                    .badRequest()
                    .body("Vous êtes déjà inscrit à cette activité");
        }

        if (activity.getPlacesDisponibles() != null
                && activity.getPlacesDisponibles() <= 0) {

            return ResponseEntity
                    .badRequest()
                    .body("Cette activité est complète");
        }

        Registration registration = new Registration();

        registration.setUser(user);
        registration.setActivity(activity);
        registration.setDateInscription(LocalDateTime.now());

        if (activity.getPayante() != null
                && activity.getPayante()) {

            registration.setStatut("PAIEMENT_EN_ATTENTE");

        } else {

            registration.setStatut("VALIDEE");
        }

        registrationService.saveRegistration(registration);

        if (activity.getPlacesDisponibles() != null) {

            activity.setPlacesDisponibles(
                    activity.getPlacesDisponibles() - 1
            );

            activityService.saveActivity(activity);
        }

        return ResponseEntity
                .ok("Inscription enregistrée avec succès");
    }

    @PutMapping("/{id}/statut")
    public ResponseEntity<?> updateRegistrationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {

        Optional<Registration> registrationOptional =
                registrationService.getRegistrationById(id);

        if (registrationOptional.isEmpty()) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        String nouveauStatut = body.get("statut");

        if (nouveauStatut == null
                || nouveauStatut.isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body("Le statut est obligatoire");
        }

        Registration registration =
                registrationOptional.get();

        registration.setStatut(nouveauStatut);

        Registration updatedRegistration =
                registrationService.saveRegistration(
                        registration
                );

        return ResponseEntity.ok(updatedRegistration);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistration(
            @PathVariable Long id
    ) {

        Optional<Registration> registrationOptional =
                registrationService.getRegistrationById(id);

        if (registrationOptional.isEmpty()) {

            return ResponseEntity.notFound().build();
        }

        Registration registration =
                registrationOptional.get();

        Activity activity =
                registration.getActivity();

        if (activity != null
                && activity.getPlacesDisponibles() != null) {

            activity.setPlacesDisponibles(
                    activity.getPlacesDisponibles() + 1
            );

            activityService.saveActivity(activity);
        }

        registrationService.deleteRegistration(id);

        return ResponseEntity.noContent().build();
    }
}