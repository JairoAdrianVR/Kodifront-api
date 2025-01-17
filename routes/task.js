const express = require('express');
const { readTasks, writeTasks } = require('../data/tasks');

const router = express.Router();

// Obtener todas las tareas
router.get('/', (req, res) => {
  const tasks = readTasks();
  res.json({count: tasks.length , data: tasks});
});

// Crear una nueva tarea
router.post('/', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: req.body.title,
    completed: req.body.completed || 0,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// Actualizar una tarea por ID
router.put('/:id', (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: req.body.title || tasks[taskIndex].title,
    completed: req.body.completed !== undefined ? req.body.completed : tasks[taskIndex].completed,
  };
  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// Eliminar una tarea por ID
router.delete('/:id', (req, res) => {
  const tasks = readTasks();
  const taskId = parseInt(req.params.id, 10);
  const filteredTasks = tasks.filter((task) => task.id !== taskId);

  if (tasks.length === filteredTasks.length) {
    return res.status(404).json({ message: 'Task not found' });
  }

  writeTasks(filteredTasks);
  res.status(200).send({ message: 'Task deleted successfully' });
});

module.exports = router;