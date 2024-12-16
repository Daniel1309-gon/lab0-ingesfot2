const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todas las viviendas
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM VIVIENDA');
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontraron viviendas');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Obtener una vivienda por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM VIVIENDA WHERE id_viv = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró la vivienda');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear una nueva vivienda
router.post('/', async (req, res) => {
    try {
        const { direccion_id, capacidad, niveles, municipio_id_mun} = req.body;
        const result = await pool.query(
            'INSERT INTO VIVIENDA (direccion_id, capacidad, niveles, municipio_id_mun) VALUES ($1, $2, $3, $4) RETURNING *',
            [direccion_id, capacidad, niveles, municipio_id_mun]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Actualizar una vivienda
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { direccion_id, capacidad, niveles, municipio_id_mun } = req.body;
        const result = await pool.query(
            'UPDATE VIVIENDA SET direccion_id = $1, capacidad = $2, niveles = $3, municipio_id_mun = $4 WHERE id_viv = $5 RETURNING *',
            [direccion_id, capacidad, niveles, municipio_id_mun, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró la vivienda');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Eliminar una vivienda
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM VIVIENDA WHERE id_viv = $1', [id]);
        res.send('Vivienda eliminada correctamente');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
