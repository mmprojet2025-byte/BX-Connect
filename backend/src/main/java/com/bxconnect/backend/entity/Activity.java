package com.bxconnect.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titre", nullable = false, length = 150)
    private String titre;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "lieu", nullable = false, length = 150)
    private String lieu;

    @Column(name = "categorie", nullable = false, length = 100)
    private String categorie;

    @Column(name = "capacite_max")
    private Integer capaciteMax;

    @Column(name = "places_disponibles")
    private Integer placesDisponibles;

    @Column(name = "payante")
    private Boolean payante;

    @Column(name = "prix")
    private Double prix;

    public Activity() {
    }

    public Activity(Long id, String titre, String description, LocalDateTime date,
                    String lieu, String categorie, Integer capaciteMax,
                    Integer placesDisponibles, Boolean payante, Double prix) {

        this.id = id;
        this.titre = titre;
        this.description = description;
        this.date = date;
        this.lieu = lieu;
        this.categorie = categorie;
        this.capaciteMax = capaciteMax;
        this.placesDisponibles = placesDisponibles;
        this.payante = payante;
        this.prix = prix;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public Integer getCapaciteMax() {
        return capaciteMax;
    }

    public void setCapaciteMax(Integer capaciteMax) {
        this.capaciteMax = capaciteMax;
    }

    public Integer getPlacesDisponibles() {
        return placesDisponibles;
    }

    public void setPlacesDisponibles(Integer placesDisponibles) {
        this.placesDisponibles = placesDisponibles;
    }

    public Boolean getPayante() {
        return payante;
    }

    public void setPayante(Boolean payante) {
        this.payante = payante;
    }

    public Double getPrix() {
        return prix;
    }

    public void setPrix(Double prix) {
        this.prix = prix;
    }
}