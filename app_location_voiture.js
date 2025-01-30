const express = require('express');
const mysql = require('mysql2/promise');
const fs = require('fs');

const app = express();
app.use(express.json());

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    multipleStatements: true
};

const executeSQLFile = async (connection, filePath) => {
    const sql = fs.readFileSync(filePath, 'utf8');
    await connection.query(sql);
    console.log(`${filePath} exécuté avec succès`);
};

const initDB = async () => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        console.log('Connexion à MySQL réussie');

        await executeSQLFile(connection, 'db.sql');

        await connection.changeUser({ database: 'location_vehicules' });

        await executeSQLFile(connection, 'data.sql');

        console.log('Base de données initialisée avec succès');
        return connection;
    } catch (err) {
        console.error('Erreur lors de l\'initialisation de la base de données :', err);
        process.exit(1);
    }
};

initDB().then(connection => {

    app.post('/vehicules', async (req, res) => {
        const { modele, marque, annee, tarif_journalier, disponible } = req.body;
        const sql = 'INSERT INTO vehicules (modele, marque, annee, tarif_journalier, disponible) VALUES (?, ?, ?, ?, ?)';
        await connection.query(sql, [modele, marque, annee, tarif_journalier, disponible]);
        res.status(201).json({ message: 'Véhicule ajouté avec succès' });
    });

    app.get('/vehicules', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM vehicules');
        res.json(result);
    });

    app.put('/vehicules/:id', async (req, res) => {
        const { modele, marque, annee, tarif_journalier, disponible } = req.body;
        const sql = 'UPDATE vehicules SET modele = ?, marque = ?, annee = ?, tarif_journalier = ?, disponible = ? WHERE id = ?';
        await connection.query(sql, [modele, marque, annee, tarif_journalier, disponible, req.params.id]);
        res.json({ message: 'Véhicule mis à jour avec succès' });
    });

    app.delete('/vehicules/:id', async (req, res) => {
        await connection.query('DELETE FROM vehicules WHERE id = ?', [req.params.id]);
        res.json({ message: 'Véhicule supprimé avec succès' });
    });

    app.get('/vehicules/disponibles', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM vehicules WHERE disponible = 1');
        res.json(result);
    });


    app.post('/clients', async (req, res) => {
        const { nom, prenom, email, telephone } = req.body;
        const sql = 'INSERT INTO clients (nom, prenom, email, telephone) VALUES (?, ?, ?, ?)';
        await connection.query(sql, [nom, prenom, email, telephone]);
        res.status(201).json({ message: 'Client ajouté avec succès' });
    });

    app.get('/clients', async (req, res) => {
        const [result] = await connection.query('SELECT * FROM clients');
        res.json(result);
    });


    app.post('/locations', async (req, res) => {
        const { client_id, vehicule_id, date_debut, date_fin } = req.body;
        const sql = 'INSERT INTO locations (client_id, vehicule_id, date_debut, date_fin) VALUES (?, ?, ?, ?)';
        await connection.query(sql, [client_id, vehicule_id, date_debut, date_fin]);
        res.status(201).json({ message: 'Location enregistrée avec succès' });
    });

    app.delete('/locations/:id', async (req, res) => {
        await connection.query('DELETE FROM locations WHERE id = ?', [req.params.id]);
        res.json({ message: 'Location annulée avec succès' });
    });

    app.get('/locations', async (req, res) => {
        const [result] = await connection.query('SELECT locations.*, clients.nom, clients.prenom, vehicules.modele, vehicules.marque FROM locations JOIN clients ON locations.client_id = clients.id JOIN vehicules ON locations.vehicule_id = vehicules.id');
        res.json(result);
    });

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
});
