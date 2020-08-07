const request = require('supertest')

const app = require('../src/app')
const User = require('../src/models/user')

const { userOneId, userOne, setupDatabase, teardownDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
  const testUser = {
    name: 'Test',
    email: 'test@email.com',
    password: 'test123!'
  }
  const response = await request(app).post('/users').send(testUser).expect(201)

  // Assert that a new user was created
  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  // Assertions about the response body
  expect(response.body).toMatchObject({
    user: {
      name: testUser.name,
      email: testUser.email
    },
    token: user.tokens[0].token
  })
  expect(user.password).not.toBe(testUser.password)
})

test('Should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200)

  // Assert that token response matches users second token
  const user = await User.findById(response.body.user._id)
  expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should reject login of nonexisting user', async () => {
  await request(app).post('/users/login').send({
    email: userOne.email,
    password: 'badpass'
  }).expect(400)
})

test('Should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should fail to get profile for unauthorized user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete profile for user', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  // Assert that user was in-fact deleted 
  const user = await User.findById(userOneId)
  expect(user).toBeNull()
})

test('Should fail to delete profile for unauthorized user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)
  
  // Assert that avatar binary was added to user document
  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  const name = 'John Doe'
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name })
    .expect(200)
  
  // Assert that user name was in-fact updated
  const user = await User.findById(userOneId)
  expect(user.name).toEqual(name)
})

test('Should fail to update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'Earth' })
    .expect(400)
})

test('Should not signup user with invalid name/email/password', async () => {
  const testUser = {
    name: 'Test2',
    email: 'test@email.com',
    password: 'testpass123!'
  }
  // Assert that user with invalid email cannot be created
  await request(app)
    .post('/users')
    .send({ ...testUser, email: 'bademail' })
    .expect(400)
  // Assert that user with invalid name cannot be created
  await request(app)
    .post('/users')
    .send({ ...testUser, name: undefined })
    .expect(400)
  // Assert that user with invalid password cannot be created
  await request(app)
    .post('/users')
    .send({ ...testUser, password: 'password' })
    .expect(400)
})

test('Should not update user if unauthenticated', async () => {
  await request(app)
    .patch('/users/me')
    .send({ name: 'New Name' })
    .expect(401)
})

test('Should not update user with invalid name/email/password', async () => {
  // Assert that user name cannot be updated if passed a bad name
  const name = null
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name })
    .expect(400)

  // Assert that user email cannot be updated if passed a bad email
  const email = 'bademail'
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ email })
    .expect(400)

  // Assert that above requests were not saved to database
  const user = await User.findById(userOneId)
  expect(user.name).not.toEqual(name)
  expect(user.email).not.toEqual(email)

  // Assert that user password cannot be updated if passed a bad password
  const password = 'password'
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ password })
    .expect(400)

  // Assert that above requests were not saved to database
  const afterPatchUser = await User.findById(userOneId)
  expect(user.password).toEqual(afterPatchUser.password)
})

test('Should not delete user if unauthenticated', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

afterAll(teardownDatabase)
