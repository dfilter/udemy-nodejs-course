const request = require('supertest')

const app = require('../src/app')
const Task = require('../src/models/task')

const { 
  userOne,
  userTwo,
  setupDatabase,
  taskOne,
  taskTwo,
  teardownDatabase
} = require('./fixtures/db')

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

test('Should not create task with invalid description/completed', async () => {
  const testTask = {
    description: 'Test Description',
    completed: false
  }
  await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(400)
  
  await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ ...testTask, completed: 'not a bool' })
    .expect(400)
})

test('Should not update task with invalid description/completed', async () => {
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ description: null })
    .expect(400)
  
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ completed: 'not a boolean' })
    .expect(400)
})

test('Should delete user task', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskTwo._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  
  // Assert that task no-longer exists
  const task = await Task.findById(response.body._id)
  expect(task).toBeNull()
})

test('Should not delete task if unauthenticated', async () => {
  await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .send()
    .expect(401)
  
  // Assert that task still exists
  const task = await Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})

test('Should not update other users task', async () => {
  const description = 'Test'
  await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({ description })
    .expect(404)
  
  // Assert that task description was not updated
  const task = await Task.findById(taskOne._id)
  expect(task.description).not.toEqual(description)
})

test('Should fetch user task by id', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not fetch user task by id if unauthenticated', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .send()
    .expect(401)
})

test('Should not fetch other users task by id', async () => {
  await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
})

test('Should fetch only completed tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=1`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  expect(response.body.length).toEqual(1)
})

test('Should fetch only incomplete tasks', async () => {
  const response = await request(app)
    .get(`/tasks?completed=0`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  expect(response.body.length).toEqual(1)
})

test('Should sort tasks by description/completed/createdAt/updatedAt', async () => {
  await request(app)
    .get(`/tasks?sortBy=description`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  await request(app)
    .get(`/tasks?sortBy=completed`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  await request(app)
    .get(`/tasks?sortBy=createdAt`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  await request(app)
    .get(`/tasks?sortBy=updatedAt`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should fetch page of tasks', async () => {
  await request(app)
    .get(`/tasks?page=1&limit=5`)
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

afterAll(teardownDatabase)
