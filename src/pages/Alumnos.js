// alumnos.js
const express = require('express');
const router = express.Router();

// Lista de alumnos inicial
let alumnos = [
    { id: 1, nombre: "Juan", apellido: "Pérez" },
    { id: 2, nombre: "Ana", apellido: "Gómez" }
];

// POST: Crear un nuevo alumno
router.post('/crear-alumno-v', (req, res) => {
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido) {
        return res.status(400).json({ error: "Faltan datos" });
    }
    const nuevoAlumno = {
        id: alumnos.length + 1,
        nombre,
        apellido
    };
    alumnos.push(nuevoAlumno);
    res.status(201).json({ mensaje: "Alumno creado", alumno: nuevoAlumno });
});

// GET: Obtener todos los alumnos
router.get('/alumnos', (req, res) => {
    res.json(alumnos);
});

module.exports = router;
