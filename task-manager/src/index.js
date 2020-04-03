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
  dest: 'images',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.doc(|x)$/)) {
      return cb(new Error('File must be a word document'))  // send error for callback
    }

    cb(undefined, true)  // accept callback
    // cb(undefined, false)  // silently reject callback
  }
})

// use multer upload.single as middleware
app.post('/upload', upload.single('upload'), (req, res) => {
  res.send()
}, (error, req, res, next) => {  // handle errors
  res.status(400).send({ error: error.message })
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})
