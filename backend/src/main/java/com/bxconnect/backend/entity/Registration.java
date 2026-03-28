package com.bxconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "registrations",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "activity_id"})
    }
)
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "activity_id", nullable = false)
    private Activity activity;

    @Column(name = "date_inscription", nullable = false)
    private LocalDateTime dateInscription;

    public Registration() {
    }

    public Registration(Long id, User user, Activity activity, LocalDateTime dateInscription) {
        this.id = id;
        this.user = user;
        this.activity = activity;
        this.dateInscription = dateInscription;
    }

    @PrePersist
    public void prePersist() {
        if (this.dateInscription == null) {
            this.dateInscription = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Activity getActivity() {
        return activity;
    }

    public void setActivity(Activity activity) {
        this.activity = activity;
    }

    public LocalDateTime getDateInscription() {
        return dateInscription;
    }

    public void setDateInscription(LocalDateTime dateInscription) {
        this.dateInscription = dateInscription;
    }
}