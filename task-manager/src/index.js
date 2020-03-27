// Third party packages:
const express = require('express')

// Local packages:
require('./db/mongoose')  // run file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000

const multer = require('multer')

const upload = multer({
  dest: 'images'
})

// use multer upload.single as middleware
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})
