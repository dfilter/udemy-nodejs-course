const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'John',
  email: 'john@email.com',
  password: 'johnpass123!',
  tokens: [{
    token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  }]
}
const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'Jane Doe',
  email: 'janedoe@email.com',
  password: 'janepass123!',
  tokens: [{
    token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
  }]
}
const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Task One',
  completed: false,
  owner: userOneId
}
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Task Two',
  completed: true,
  owner: userOneId
}
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Task Three',
  completed: false,
  owner: userTwoId
}

const setupDatabase = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

const teardownDatabase = async () => {
  await mongoose.connection.close()
}

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  setupDatabase,
  taskOne,
  taskTwo,
  taskThree,
  teardownDatabase
}
