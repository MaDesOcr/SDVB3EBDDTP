USE location_vehicules;

-- Insérer des véhicules
INSERT INTO vehicules (modele, marque, annee, tarif_journalier, disponible) VALUES
('Clio', 'Renault', 2022, 50.00, TRUE),
('208', 'Peugeot', 2021, 55.00, TRUE),
('Golf', 'Volkswagen', 2020, 60.00, FALSE),
('Corsa', 'Opel', 2023, 48.00, TRUE),
('Fiesta', 'Ford', 2019, 45.00, TRUE);

-- Insérer des clients
INSERT INTO clients (nom, prenom, email, telephone) VALUES
('Dupont', 'Jean', 'jean.dupont@example.com', '0601020304'),
('Martin', 'Sophie', 'sophie.martin@example.com', '0611121314'),
('Durand', 'Paul', 'paul.durand@example.com', '0622232425'),
('Bernard', 'Elise', 'elise.bernard@example.com', '0633343536'),
('Morel', 'Lucas', 'lucas.morel@example.com', '0644454647');

-- Insérer des locations
INSERT INTO locations (client_id, vehicule_id, date_debut, date_fin) VALUES
(1, 2, '2024-02-01', '2024-02-05'),
(2, 4, '2024-02-03', '2024-02-07'),
(3, 1, '2024-02-05', '2024-02-10'),
(4, 5, '2024-02-08', '2024-02-12');
