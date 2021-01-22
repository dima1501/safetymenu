const bodyParser = require('body-parser')
const express = require('express')
const router = express.Router()

const { ObjectId } = require('mongodb').ObjectID

const auth = require('../middlewares/AuthMiddleware')

router.post(
  '/add-good',
  auth(),
  bodyParser.urlencoded({ extended: false }),
  async (req, res) => {
    try {
      const add = await req.db.collection("users").updateOne(
        {_id: ObjectId(req.user._id)},
        {$push: {goods: req.body}}
      )

      if (add) {
        res.send(true)
      }
      res.send(false)

    } catch (error) {
      console.error(error)
    }
  }
)

router.post(
  '/remove-good',
  auth(),
  bodyParser.urlencoded({ extended: false }),
  async (req, res) => {
    try {
      const remove = await req.db.collection("users").updateOne(
        {_id: ObjectId(req.user._id)},
        { $pull: { 'goods': { id: req.body.id } } }
      )

      if (remove) {
        res.send(true)
      } else {
        res.send(false)
      }

    } catch (error) {
      console.error(error)
    }
  }
)

module.exports = router
