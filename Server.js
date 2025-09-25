const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración SQL Server
const dbConfig = {
  user: "LAPTOP-38NK2SP6",               
  password: "",
  server: "localhost",      
  database: "Alumnos",      
  options: { encrypt: false, trustServerCertificate: true }
};

sql.connect(dbConfig)
  .then(pool => console.log(" Conectado con Windows Authentication"))
  .catch(err => console.error(" ERROR CONEXIÓN SQL:", err));


  // Listar alumnos
  app.get('/alumnos', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM Alumnos');
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al listar alumnos' });
    }
  });

  // Crear alumno
  app.post('/crear-alumno', async (req, res) => {
    const { numero_control, nombre, apellido, direccion, carrera, semestre } = req.body;
    try {
      await pool.request()
        .input('numero_control', sql.VarChar, numero_control)
        .input('nombre', sql.VarChar, nombre)
        .input('apellido', sql.VarChar, apellido)
        .input('direccion', sql.VarChar, direccion)
        .input('carrera', sql.VarChar, carrera)
        .input('semestre', sql.Int, semestre)
        .query(`
          INSERT INTO Alumnos
          (numero_control, nombre, apellido, direccion, carrera, semestre)
          VALUES
          (@numero_control, @nombre, @apellido, @direccion, @carrera, @semestre)
        `);
      res.status(201).json({ mensaje: 'Alumno creado con éxito' });
    } catch (err) {
      console.error(" ERROR AL INSERTAR:", err);
      res.status(500).json({ error: 'Error al crear alumno' });
    }
  });

