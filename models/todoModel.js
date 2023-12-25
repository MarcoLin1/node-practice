const { v4: uuidv4 } = require('uuid');

class TodoModel {
  constructor () {
    this.todoList = [
      {
        id: '1',
        title: 'default todo'
      }
    ]
  }

  // get all todo
  getAllTodo() {
    return this.todoList
  }

  // get single todo
  getTodo(id) {
    return this.todoList.find(todo => todo.id === id)
  }

  // add new todo
  createTodo(todo) {
    const { title } = todo
    const newTodo = {
      id: uuidv4(),
      title
    }
    this.todoList.push(newTodo)
    return newTodo
  }

  // update todo
  updateTodo(id, updateFields) {
    const todo = this.todoList.find(todo => todo.id === id)
    if (todo) {
      Object.assign(todo, updateFields)
    }
    return todo
  }

  // delete todo
  deleTodo(id) {
    const todoIndex = this.todoList.findIndex(todo => todo.id === id)
    if (todoIndex > -1) {
      return this.todoList.splice(todoIndex, 1)[0]
    }
  }
}

module.exports = new TodoModel()