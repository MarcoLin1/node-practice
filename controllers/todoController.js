const todoModel = require('../models/todoModel');

exports.getAllTodo = (req, res) => {
  res.send({
    status: 'success',
    data: todoModel.getAllTodo()
  })
}

exports.getTodo = (req, res) => {
  const { id } = req.params
  const todo = todoModel.getTodo(id)
  if (!todo) {
    return res.status(404).send({
      status: 'fail',
      message: 'todo not found'
    })
  }
  res.send({
    status: 'success',
    data: todo
  })
}

exports.createTodo = (req, res) => {
  if (!req.body.title) {
    return res.status(404).send({
      status: 'fail',
      message: 'title is required'
    })
  }

  if (typeof req.body.title !== 'string') {
    return res.status(404).send({
      status: 'fail',
      message: 'title must be a string'
    })
  }

  const newTodo = todoModel.createTodo({
    title: req.body.title
  })

  res.send({
    status: 'success',
    data: newTodo
  })
}

exports.updateTodo = (req, res) => {
  const { id } = req.query
  const todo = todoModel.updateTodo(id, req.body)
  if (!todo) {
    return res.send({
      status: 'fail',
      message: 'todo not found',
      id: req.query.id
    })
  }
  res.send({
    data: todo
  })
}

exports.deleteTodo = (req, res) => {
  const { id } = req.query
  const todo = todoModel.deleTodo(id)
  if (!todo) {
    return res.status(404).send({
      status: 'fail',
      message: 'todo not found'
    })
  }
  res.send({
    status: 'success',
    data: todo
  })
}