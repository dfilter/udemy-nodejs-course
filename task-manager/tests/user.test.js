const request = require('supertest')

const app = require('../src/app')

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: 'John',
    email: 'johndoe@email.com',
    password: 'MyPassword123!'
  }).expect(201)
})
