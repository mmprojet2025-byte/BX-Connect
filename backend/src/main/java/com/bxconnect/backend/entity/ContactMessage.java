package com.bxconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String email;

    @Column(length = 2000)
    private String message;

    private LocalDateTime dateEnvoi;

    public ContactMessage() {
    }

    public ContactMessage(String nom, String email, String message, LocalDateTime dateEnvoi) {
        this.nom = nom;
        this.email = email;
        this.message = message;
        this.dateEnvoi = dateEnvoi;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getDateEnvoi() {
        return dateEnvoi;
    }

    public void setDateEnvoi(LocalDateTime dateEnvoi) {
        this.dateEnvoi = dateEnvoi;
    }
}