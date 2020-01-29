require('../src/db/mongoose')
const User = require('../src/models/user')

const _id = '5e319f93d58ee11fd0433a7a'

// User.findByIdAndUpdate(_id, { age: 1 }).then(user => {
//   console.log(user)
//   return User.countDocuments({ age: 1 })
// }).then(users => {
//   console.log(users)
// }).catch(error => {
//   console.error(error)
// })

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age })
  const count = await User.countDocuments({ age })
  return { user, count }
}

updateAgeAndCount(_id, 2).then(result => {
  console.log(result)
}).catch(error => {
  console.error(error)
})
