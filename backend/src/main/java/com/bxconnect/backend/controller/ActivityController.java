package com.bxconnect.backend.controller;

import com.bxconnect.backend.entity.Activity;
import com.bxconnect.backend.service.ActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin(origins = "http://localhost:5173")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Activity> getActivityById(@PathVariable Long id) {
        return activityService.getActivityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        return activityService.saveActivity(activity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Activity> updateActivity(@PathVariable Long id, @RequestBody Activity activityDetails) {
        return activityService.getActivityById(id)
                .map(activity -> {
                    activity.setTitre(activityDetails.getTitre());
                    activity.setDescription(activityDetails.getDescription());
                    activity.setDate(activityDetails.getDate());
                    activity.setLieu(activityDetails.getLieu());
                    activity.setCategorie(activityDetails.getCategorie());
                    return ResponseEntity.ok(activityService.saveActivity(activity));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable Long id) {
        if (activityService.getActivityById(id).isPresent()) {
            activityService.deleteActivity(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}