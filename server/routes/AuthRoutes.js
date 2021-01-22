const crypto = require('crypto')

const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

const { ObjectId } = require('mongodb').ObjectID

const UserService = require('../services/UserService')
const SessionService = require('../services/SessionService')

const auth = require('../middlewares/AuthMiddleware')

router.post('/checkauth', auth(), (req, res) => {
  res.send(req.user)
})

router.post(
  '/registration',
  auth(),
  bodyParser.urlencoded({ extended: false }),
  async (req, res) => {
    const { name, password, email, goods } = req.body
    const userRepeat = await new UserService().findUserByUsername(req, email)

    if (userRepeat) {
      return res.send(false)
    }

    const user = await new UserService().createUser(
      req,
      name,
      password,
      email,
      goods
    )
    const passwordHash = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex')

    if (!user || passwordHash !== user.password) {
      return res.redirect('/?authError=true')
    }

    const sessionId = await new SessionService().createSession(req, user._id)
    res.cookie('sessionId', sessionId, { httpOnly: true }).send(user)
  }
)

router.post(
  '/login',
  auth(),
  bodyParser.urlencoded({ extended: false }),
  async (req, res) => {
    const { email, password } = req.body
    try {
      const user = await new UserService().findUserByUsername(req, email)
      const passwordHash = await crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')

      if (!user || passwordHash !== user.password) {
        return
      }

      const sessionId = await new SessionService().createSession(req, user._id)
      res.cookie('sessionId', sessionId, { httpOnly: true }).send(user)
    } catch (err) {
      console.error(err)
    }
  }
)

router.post(
  '/signup',
  auth(),
  bodyParser.urlencoded({ extended: false }),
  async (req, res) => {
    const { username, password, email } = req.body
    try {
      const user = await new UserService().createUser(
        req,
        username,
        password,
        email
      )
      const passwordHash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')

      if (!user || passwordHash !== user.password) {
        return res.redirect('/?authError=true')
      }

      const sessionId = await new SessionService().createSession(req, user._id)
      res.cookie('sessionId', sessionId, { httpOnly: true }).send(user)
    } catch (err) {
      console.error(err)
    }
  }
)

// Tutor registration
router.post(
  '/signup-tutor',
  auth(),
  bodyParser.urlencoded({ extended: true }),
  async (req, res) => {
    const {
      username,
      password,
      email,
      description,
      about,
      photo,
      video,
      certificates,
      knowLanguages,
      teachLanguages,
      price,
      specs,
      native,
    } = req.body
    try {
      const tutor = await new UserService().createTutor(
        req,
        username,
        password,
        email,
        description,
        about,
        photo,
        video,
        certificates,
        knowLanguages,
        teachLanguages,
        price,
        specs,
        native
      )

      const passwordHash = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')

      if (!tutor || passwordHash !== tutor.password) {
        return res.redirect('/?authError=true')
      }

      const sessionId = await new SessionService().createSession(req, tutor._id)
      res.cookie('sessionId', sessionId, { httpOnly: true }).send(tutor)
    } catch (err) {
      console.error(err)
    }
  }
)

router.get('/logout', auth(), async (req, res) => {
  if (!req.user) {
    return res.redirect('/')
  }

  try {
    await new SessionService().deleteSession(req, req.sessionId)
    res.clearCookie('sessionId').redirect('/')
  } catch (err) {
    console.error(err)
  }
})

router.post('/set-peer-id', auth(), async (req, res) => {
  try {
    const setPeerId = await req.db
      .collection(req.user.price ? 'tutors' : 'users')
      .updateOne(
        { _id: ObjectId(req.user._id) },
        { $push: { peerId: req.body.id } },
        { upsert: true }
      )
    res.send(setPeerId)
  } catch (error) {
    console.error(error)
  }
})

router.post('/get-peer-id', auth(), async (req, res) => {
  try {
    const peer = await req.db
      .collection(req.user.price ? 'users' : 'tutors')
      .findOne({ _id: ObjectId(req.body.id) })
    res.send(peer.peerId)
  } catch (error) {
    console.error(error)
  }
})

router.post('/remove-peer-id', auth(), async (req, res) => {
  try {
    const peer = await req.db
      .collection(req.user.price ? 'users' : 'tutors')
      .updateMany(
        { _id: ObjectId(req.body.connectingTo) },
        { $pull: { peerId: req.body.peerId } }
      )

    res.send(peer)
  } catch (error) {
    console.error(error)
  }
})

router.post('/update-users-data', auth(), async (req, res) => {
  try {
    const update = await req.db.collection('users').updateOne(
      { _id: ObjectId(req.user._id) },
      {
        $set: {
          username: req.body.username ? req.body.username : req.user.username,
          photo: req.body.photo ? req.body.photo : req.user.photo,
        },
      }
    )
    res.send(update)
  } catch (error) {
    console.error(error)
  }
})

router.post('/check-secure-code', async (req, res) => {
  try {
    const isPairValid = await req.db.collection('users').findOne({
      email: req.body.email,
      secureCode: +req.body.code,
    })

    if (isPairValid) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (error) {
    console.error(error)
  }
})

router.post('/set-new-password', async (req, res) => {
  try {
    const passwordHash = await crypto
      .createHash('sha256')
      .update(req.body.password)
      .digest('hex')

    const setNewPassword = await req.db.collection('users').updateOne(
      {
        email: req.body.email,
        secureCode: +req.body.code,
      },
      {
        $set: {
          password: passwordHash,
        },
      }
    )

    if (setNewPassword) {
      res.send(true)
    } else {
      res.send(false)
    }
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
