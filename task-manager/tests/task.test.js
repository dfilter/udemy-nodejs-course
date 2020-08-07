const request = require('supertest')

const app = require('../src/app')
const Task = require('../src/models/task')

const { userOneId, userOne, setupDatabase, teardownDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user', async () => {
  const taskOne = {
    description: 'Test Task'
  }
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send(taskOne)
    .expect(201)

  // Assert that task was created
  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toEqual(false)
})

afterAll(teardownDatabase)
