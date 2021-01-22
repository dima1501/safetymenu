const express = require('express')
const router = express.Router()
const compression = require('compression')
const clientPromise = require('../db/db')
const config = require('../config/config')

router.use(compression())

router.use(async (req, res, next) => {
  try {
    const client = await clientPromise
    req.db = client.db(config.DB_NAME)
    next()
  } catch (error) {
    console.error(error)
  }
})

router.use('/', require('./AuthRoutes'))
router.use('/', require('./MenuRoutes'))

module.exports = router
