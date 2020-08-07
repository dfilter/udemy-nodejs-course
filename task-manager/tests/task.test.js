const request = require('supertest')

const app = require('../src/app')
const Task = require('../src/models/task')

const { userOne, userTwo, setupDatabase, taskOne, teardownDatabase } = require('./fixtures/db')

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

test('Should get tasks for a given user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  // Assert that the only tasks for this user are those defined in ./fixtures/db.js for userOne
  expect(response.body.length).toEqual(2)
})

test('Should fail to delete task not belonging to given user', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

  // Assert that task still exists
  const task = await Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})

afterAll(teardownDatabase)
