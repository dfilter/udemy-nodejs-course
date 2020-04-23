// C:\Users\dfilter\mongodb\bin\mongod.exe --dbpath=C:\Users\dfilter\mongodb-data
// /home/dfilter/mongodb/bin/mongod --dbpath=/home/dfilter/mongodb-data

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database.')
  }

  const db = client.db(databaseName)

  // db.collection('users').updateOne({ 
  //   _id: new ObjectID('5e2f13390623822d74fab5d9') 
  // }, { 
  //   $inc: {
  //     age: 1
  //   }
  // }).then(response => {
  //   console.log(response)
  // }).catch(error => {
  //   console.log(error)
  // })

  // db.collection('tasks').updateMany({
  //   completed: false
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }).then(response => {
  //   console.log(response)
  // }).catch(error => {
  //   console.log(error)
  // })

  db.collection('users').deleteOne({ 
    age: 21 
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })

  db.collection('tasks').deleteOne({ 
    description: 'Take out the trash' 
  }).then(response => {
    console.log(response)
  }).catch(error => {
    console.log(error)
  })
})