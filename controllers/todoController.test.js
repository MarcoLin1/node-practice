const request = require('supertest')
const app = require('../app')
const TodoModel = require('../models/todoModel')

beforeEach(() => {
  TodoModel.todoList = [
    {
      id: '1',
      title: 'todo 1'
    },
    {
      id: '2',
      title: 'todo 2'
    }
  ]
})

describe('todoController', () => {
  test('should get all todo', async () => {
    const res = await request(app).get('/todo')

    expect(res.body.data).toEqual(TodoModel.todoList)
    expect(res.statusCode).toBe(200)
  })

  test('should get single todo', async () => {
    const res = await request(app).get('/todo/1')
    expect(res.body.data).toEqual(TodoModel.todoList[0])
    expect(res.statusCode).toBe(200)
  })

  test('should add new todo', async () => {
    const res = await request(app).post('/todo').send({
      title: 'todo 3'
    })

    expect(res.body.data.title).toBe('todo 3')
    expect(res.statusCode).toBe(200)
  })

  test('should add new todo fail when title is empty', async () => {
    const res = await request(app).post('/todo').send({
      title: ''
    })

    expect(res.body.status).toBe('fail')
    expect(res.body.message).toBe('title is required')
    expect(res.statusCode).toBe(404)
  })
  
  test('should update todo', async () => {
    const res = await request(app).put('/todo?id=1').send({
      title: 'todo 1 updated'
    })

    expect(res.body.data.title).toBe('todo 1 updated')
    expect(res.body.data.id).toBe('1')
    expect(res.statusCode).toBe(200)
  })

  test('should delete todo', async () => {
    const res = await request(app).delete('/todo?id=1')
    expect(res.body.data.id).toBe('1')
    expect(res.statusCode).toBe(200)
  })
});
