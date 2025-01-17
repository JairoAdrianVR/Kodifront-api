// index.js
const express = require('express');
const taskRoutes = require('./routes/task');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Usar rutas
app.use('/api/tasks', taskRoutes);


//Documentacion de las rutas
app.get('/documentacion', (req, res) => {
  res.send(`
    <div style="padding: 20px;background-color: #f0f0f0; font-family: Arial, sans-serif; ">
    <h1 style="color:white; text-align: center; text-shadow: 3px 3px 6px rgb(105,30,172); font-size: 3rem;">API de Tareas</h1>
    <h2>Rutas</h2>
    <ul>
      <li>GET /api/tasks - Obtener todas las tareas</li>
      <li>POST /api/tasks - Crear una nueva tarea</li>
      <li>PUT /api/tasks/:id - Actualizar una tarea por ID</li>
      <li>DELETE /api/tasks/:id - Eliminar una tarea por ID</li>
    </ul>
    <h2>Detalles de los Endpoints</h2>
    <h3>GET /api/tasks</h3>
    <p>Descripción: Obtener todas las tareas.</p>
    <p>Response:</p>
    <pre>
    {   count: "number",
        data: [
          {
            "id": "string",
            "title": "string",
            "description": "string",
            "completed": "number"
          },{
          "id": "string",
          "title": "string",
          "description": "string",
          "completed": "number"
         }]
    }
    </pre>

    <h3>POST /api/tasks</h3>
    <p>Descripción: Crear una nueva tarea.</p>
    <p>Body:</p>
    <pre>
      {
        "title": "string",
        "description": "string",
        "completed": "boolean"
      }
    </pre>
    <p>Response:</p>
    <pre>
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "completed": "boolean"
      }
    </pre>

    <h3>PUT /api/tasks/:id</h3>
    <p>Descripción: Actualizar una tarea por ID.</p>
    <p>Body:</p>
    <pre>
      {
        "title": "string",
        "description": "string",
        "completed": "boolean"
      }
    </pre>
    <p>Response:</p>
    <pre>
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "completed": "boolean"
      }
    </pre>

    <h3>DELETE /api/tasks/:id</h3>
    <p>Descripción: Eliminar una tarea por ID.</p>
    <p>Response:</p>
    <pre>
      {
        "message": "Tarea eliminada"
      }
    </pre>
    </div>
  `);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});