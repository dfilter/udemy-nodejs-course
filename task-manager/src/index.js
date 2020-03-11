// Third party packages:
const express = require('express')

// Local packages:
require('./db/mongoose')  // run file
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000

// Middleware must be set before other app.use() calls
// app.use((req, res, next) => {
//   if (req.method == 'GET') {
//     res.send('GET requests are disabled')
//   } else {
//     next()  // must call next to end function
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down check back soon!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`)
})
