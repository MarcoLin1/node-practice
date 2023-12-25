const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// get all todo
router.get(
  '/', 
  /* 	#swagger.tags = ['Todo']
      #swagger.description = 'get all todo'
      #swagger.responses[200] = { 
        schema: [{ 
          title: "Todo",
          id: "1"
        }]
      }
  */
  todoController.getAllTodo
)

// get todo
router.get(
  '/:id', 
  /* 	#swagger.tags = ['Todo']
      #swagger.description = 'get todo'
      #swagger.responses[200] = { 
        schema: { 
          title: "Todo",
          id: "1"
        }
      }
  */
  todoController.getTodo
)

// create todo
router.post(
  '/', 
  /* 	#swagger.tags = ['Todo']
      #swagger.description = 'add new todo'
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'add new todo',
        required: true,
        schema: {
          title: "this is new todo",
        }
      }
      #swagger.responses[200] = { 
        schema: { 
          title: "Todo",
          id: "1"
        }
      }
  */
  todoController.createTodo
)

// update todo
router.put(
  '/', 
  /* 	#swagger.tags = ['Todo']
      #swagger.parameters['obj'] = {
        in: 'body',
        description: 'update todo',
        required: true,
        schema: {
          title: "update my todo",
        }
      }
      #swagger.responses[200] = { 
        schema: { 
          title: "update my todo",
          id: "1"
        }
      }
      #swagger.description = 'update todo'
  */
  todoController.updateTodo
)

// delete todo
router.delete(
  '/', 
  /* 	#swagger.tags = ['Todo']
      #swagger.description = 'delete todo'
  */
  todoController.deleteTodo
)

module.exports = router