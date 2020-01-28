const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true  }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.')
  }
  
  const db = client.db(databaseName)

  // if there are multiple matches the first one will be selected
  // db.collection('users').findOne({ _id: new ObjectID('5e2f0a06b935cd16781bc594') }, (error, user) => {
  //   if (error) {
  //     return console.log('Unable to find user.')
  //   }
  //   console.log(user)
  // })

  // db.collection('users').find({ age: 20 }).toArray((error, users) => {
  //   if (error) {
  //     return console.log('Unable to find user.')
  //   }
  //   console.log(users)
  // })
  
  // db.collection('users').insertOne({
  //   _id: id,
  //   name: 'Jake',
  //   age: 20
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert user.')
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Jane',
  //     age: 20
  //   }, {
  //     name: 'Jim',
  //     age: 30
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert documents.')
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Take out the trash',
  //     completed: false
  //   }, {
  //     description: 'Do the dishes',
  //     completed: true
  //   }, {
  //     description: 'Shovel snow',
  //     completed: true
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert documents.')
  //   }
  //   console.log(result.ops)
  // })

  // db.collection('tasks').findOne({ _id: new ObjectID('5e2f161aecffb120e4303d22') }, (error, task) => {
  //   if (error) {
  //     return console.log('Unable to find task.')
  //   }
  //   console.log(task)
  // })

  // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
  //   if (error) {
  //     return console.log('Unable to find tasks.')
  //   }
  //   console.table(tasks)    
  // })
})