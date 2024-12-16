const express = require('express');
const router = express.Router();
const pool = require('../db.js');

// Obtener todas las personas
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM PERSONA');
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontraron personas');
        }
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Obtener una persona por ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM PERSONA WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró la persona');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Crear una nueva persona
router.post('/', async (req, res) => {
    try {
        const { nombre, apellido, telefono, edad, sexo, vivienda_id_viv, persona_id } = req.body;
        const result = await pool.query(
            'INSERT INTO PERSONA (nombre, apellido, telefono, edad, sexo, vivienda_id_viv, persona_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre, apellido, telefono, edad, sexo, vivienda_id_viv, persona_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Actualizar una persona
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, telefono, edad, sexo, vivienda_id_viv, persona_id } = req.body;
        const result = await pool.query(
            'UPDATE PERSONA SET nombre = $1, apellido = $2, telefono = $3, edad = $4, sexo = $5, vivienda_id_viv = $6, persona_id = $7 WHERE id = $8 RETURNING *',
            [nombre, apellido, telefono, edad, sexo, vivienda_id_viv, persona_id, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).send('No se encontró la persona');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Eliminar una persona
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Verificar si la persona existe
        const result = await pool.query('SELECT * FROM PERSONA WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            // Si no se encuentra, devolver 404
            return res.status(404).send('Persona no encontrada');
        }
        // Si la persona existe, proceder a eliminarla
        await pool.query('DELETE FROM PERSONA WHERE id = $1', [id]);        
        res.send('Persona eliminada correctamente');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
