const multer = require('multer')
const sharp = require('sharp')

const { Router } = require('express')

const auth = require('../middleware/auth')
const User = require('../models/user')

const { sendWelcomeEmail, sendCancellationEmail } = require('../emails/account')

const router = new Router()

const upload = multer({
  // Removing the dest property will pass through the file data to the route
  // dest: 'avatars',
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'))
    }

    cb(undefined, true)
  }
})

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    // sendWelcomeEmail(user.email, user.name)  // uncomment if you have a working email system
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()  // lives on user instance not User collection
    res.send({ user, token })
  } catch (error) {
    res.status(400).send()
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send()
  }
})

// Here we add middleware as second arg. It will run before handling function callback
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates' })
  }
  try {
    updates.forEach(update => req.user[update] = req.body[update])
    await req.user.save()
    res.send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    await req.user.remove()  // user object from middleware
    // sendCancellationEmail(req.user.email, req.user.name)  // uncomment once email setup
    res.send(req.user)
  } catch (error) {
    res.status(500).send(error)
  }
})

// use authentication middleware before using multer middleware
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  // multer will put the file here (inside buffer), if no dest property is assigned in multer config
  // req.user.avatar = req.file.buffer
  // using sharp we can process/modify the image here we set the image to be png and 250x250 px.
  const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
  req.user.avatar = buffer
  await req.user.save()
  res.send()
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user || !user.avatar) {
      throw new Error('No user or user avatar found.')
    }
    // since we used sharp to convert all avatars to png we are confident that this is the format we will be sending back
    res.set('Content-Type', 'image/png')
    res.send(user.avatar)
  } catch (error) {
    console.log(error)
    res.status(404).send()
  }
})

module.exports = router
