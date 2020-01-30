// Third party packages:
const express = require('express')

// Local packages:
require('./db/mongoose')  // run file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
  const secretKey = 'this-is-the-secret-key'
  const token = jwt.sign({ _id: '123321' }, secretKey, { expiresIn: '7 days' })
  console.log(token)

  const data = jwt.verify(token, secretKey)
  console.log(data)
}

myFunction()
