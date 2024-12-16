const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todos los municipios
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM MUNICIPIO');
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontraron municipios');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Obtener un municipio por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM MUNICIPIO WHERE id_mun = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró el municipio');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear un nuevo municipio
router.post('/', async (req, res) => {
    try {
        const { nombre, area, presupuesto, persona_id } = req.body;
        const result = await pool.query(
            'INSERT INTO MUNICIPIO (nombre, area, presupuesto, persona_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, area, presupuesto, persona_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Actualizar un municipio
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, area, presupuesto, persona_id } = req.body;
        const result = await pool.query(
            'UPDATE MUNICIPIO SET nombre = $1, area = $2, presupuesto = $3, persona_id = $4 WHERE id_mun = $5 RETURNING *',
            [nombre, area, presupuesto, persona_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró el municipio');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Eliminar un municipio
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM MUNICIPIO WHERE id_mun = $1', [id]);
        res.send('Persona eliminada correctamente');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
