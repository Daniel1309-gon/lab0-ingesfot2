const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todas las direcciones dirección
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM DIRECCION');
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontraron direcciones');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Obtener una dirección por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM DIRECCION WHERE id_direccion = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró la dirección');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear una nueva dirección
router.post('/', async (req, res) => {
    try {
        const { calle_principal, calle_secundaria, cod_postal } = req.body;
        const result = await pool.query(
            'INSERT INTO DIRECCION (calle_principal, calle_secundaria, cod_postal) VALUES ($1, $2, $3) RETURNING *',
            [calle_principal, calle_secundaria, cod_postal]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Actualizar una dirección
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { calle_principal, calle_secundaria, cod_postal } = req.body;
        const result = await pool.query(
            'UPDATE DIRECCION SET calle_principal = $1, calle_secundaria = $2, cod_postal = $3 WHERE id_direccion = $4 RETURNING *',
            [calle_principal, calle_secundaria, cod_postal, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró la dirección');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Eliminar una dirección
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM DIRECCION WHERE id_direccion = $1', [id]);

        res.send('Persona eliminada correctamente');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
