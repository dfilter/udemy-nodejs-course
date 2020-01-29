require('../src/db/mongoose')
const Task = require('../src/models/task')

const _id = '5e31bd203a1d532630a21f7e'

// Task.findByIdAndDelete(_id).then(task => {
//   console.log(task)
//   return Task.countDocuments({ completed: false })
// }).then(count => {
//   console.log(count)
// }).catch(error => {
//   console.error(error)
// })

const deleteTaskAndCount = async (id, completed) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({ completed })
  return { task, count }
}

deleteTaskAndCount(_id, false).then(result => {
  console.log(result)
}).catch(error => {
  console.error(error)
})
