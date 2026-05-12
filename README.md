# Bx-Connect — V1

## Présentation

Bx-Connect est une application web fullstack développée dans le cadre d’un travail de fin d’études.

Le projet a pour objectif de centraliser la gestion :
- des activités,
- des inscriptions,
- des utilisateurs,
- des messages de contact,
- et de l’administration de la plateforme.

L’application s’inspire du contexte associatif de Bx-Jeunes Impact et vise principalement les jeunes de 15 à 30 ans.

---

# Objectifs de la V1

La V1 permet de construire une base moderne, sécurisée et évolutive.

## Côté utilisateur

- consulter les activités
- s’inscrire à une activité
- consulter les places disponibles
- voir les activités gratuites ou payantes
- envoyer un message de contact

## Côté administrateur

- se connecter via un espace sécurisé
- ajouter une activité
- modifier une activité
- supprimer une activité
- gérer les inscriptions
- modifier les statuts des inscriptions
- consulter les messages de contact
- consulter des statistiques simples

---

# Technologies utilisées

## Frontend

- React
- Vite
- React Router
- CSS

## Backend

- Spring Boot
- Spring Data JPA
- Spring Security
- JWT Authentication
- API REST

## Base de données

- MySQL

---

# Fonctionnalités principales

## Gestion des activités

Chaque activité possède :
- un titre,
- une description,
- une date,
- un lieu,
- une catégorie,
- une capacité maximale,
- des places disponibles,
- un prix,
- un statut gratuit ou payant.

## Gestion des inscriptions

Le système permet :
- l’inscription à une activité,
- la vérification des doublons,
- la gestion automatique des places disponibles,
- la gestion des statuts :
  - VALIDEE
  - ANNULEE
  - PAIEMENT_EN_ATTENTE
  - PAIEMENT_CONFIRME

## Sécurité

Le projet intègre :
- Spring Security,
- une authentification JWT,
- la protection des routes API,
- un système de token sécurisé,
- une séparation entre routes publiques et routes administrateur.

---

# Architecture du projet

```bash
BX-Connect/
│
├── frontend/      # Application React
├── backend/       # API Spring Boot
└── database/      # Scripts SQL
