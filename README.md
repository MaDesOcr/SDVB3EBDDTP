Sujet de Projet : Gestion des Locations de Véhicules

Définir le schéma de données, mettre en place la bdd
Mettre en place le projet JS pour se connecter à la base




Description :
Le projet consiste à développer un système pour gérer les véhicules disponibles dans une agence de location et les réservations des clients.
Il inclut :
    • Une base de données pour stocker les informations sur les véhicules, les clients, et les réservations.
    • Un backend en JavaScript (Node.js) pour interagir avec la base de données et fournir une API REST.

Fonctionnalités principales :
    1. Gestion des véhicules (CRUD) :
        ◦ Ajouter un nouveau véhicule (modèle, marque, année, tarif journalier, disponibilité).
        ◦ Modifier les informations d'un véhicule.
        ◦ Supprimer un véhicule (seulement s’il n’est pas loué).
        ◦ Lister tous les véhicules disponibles.
    2. Gestion des clients :
        ◦ Ajouter un client (nom, prénom, email, téléphone).
        ◦ Lister tous les clients.
    3. Gestion des locations :
        ◦ Enregistrer une location (client, véhicule, date de début, date de fin).
        ◦ Annuler une location.
        ◦ Lister toutes les locations en cours, avec les détails des clients et des véhicules.
        ◦ Vérifier la disponibilité d’un véhicule pour une période donnée.


API REST - Backend en Node.js
Routes principales à implémenter :
    1. Routes pour les véhicules :
        ◦ POST /vehicules : Ajouter un véhicule.
        ◦ GET /vehicules : Lister tous les véhicules.
        ◦ PUT /vehicules/:id : Modifier un véhicule.
        ◦ DELETE /vehicules/:id : Supprimer un véhicule.
        ◦ GET /vehicules/disponibles : Lister les véhicules disponibles.
    2. Routes pour les clients :
        ◦ POST /clients : Ajouter un client.
        ◦ GET /clients : Lister tous les clients.
    3. Routes pour les locations :
        ◦ POST /locations : Enregistrer une location.
        ◦ DELETE /locations/:id : Annuler une location.
        ◦ GET /locations : Lister toutes les locations en cours.
