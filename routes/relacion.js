const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener todas las relaciones persona-vivienda
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PERSONA_has_VIVIENDA');
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontraron relaciones persona-vivienda');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Obtener una relación específica por persona_id y vivienda_id_viv
router.get('/:persona_id/:vivienda_id_viv', async (req, res) => {
    try {
        const { persona_id, vivienda_id_viv } = req.params;
        const result = await pool.query(
            'SELECT * FROM PERSONA_has_VIVIENDA WHERE persona_id = $1 AND vivienda_id_viv = $2',
            [persona_id, vivienda_id_viv]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Relación no encontrada');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear una nueva relación persona-vivienda
router.post('/', async (req, res) => {
    try {
        const { persona_id, vivienda_id_viv } = req.body;
        const result = await pool.query(
            'INSERT INTO PERSONA_has_VIVIENDA (persona_id, vivienda_id_viv) VALUES ($1, $2) RETURNING *',
            [persona_id, vivienda_id_viv]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Actualizar una relación persona-vivienda
router.put('/:persona_id/:vivienda_id_viv', async (req, res) => {
    try {
        const { persona_id, vivienda_id_viv } = req.params;
        const { new_persona_id, new_vivienda_id_viv } = req.body;
        const result = await pool.query(
            'UPDATE PERSONA_has_VIVIENDA SET persona_id = $1, vivienda_id_viv = $2 WHERE persona_id = $3 AND vivienda_id_viv = $4 RETURNING *',
            [new_persona_id, new_vivienda_id_viv, persona_id, vivienda_id_viv]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Relación no encontrada');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Eliminar una relación persona-vivienda
router.delete('/:persona_id/:vivienda_id_viv', async (req, res) => {
    try {
        const { persona_id, vivienda_id_viv } = req.params;
        const result = await pool.query(
            'DELETE FROM PERSONA_has_VIVIENDA WHERE persona_id = $1 AND vivienda_id_viv = $2 RETURNING *',
            [persona_id, vivienda_id_viv]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('Relación no encontrada');
        }
        res.send('Relación eliminada correctamente');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
