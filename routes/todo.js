const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// get all todo
router.get('/', todoController.getAllTodo)

// get todo
router.get('/:id', todoController.getTodo)

// create todo
router.post('/', todoController.createTodo)

// update todo
router.put('/', todoController.updateTodo)

// delete todo
router.delete('/', todoController.deleteTodo)

module.exports = router