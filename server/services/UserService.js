const crypto = require('crypto')
const { ObjectId } = require('mongodb').ObjectID
const UserModel = require('../models/User')

class UserService {
  async createUser(req, name, password, email, goods) {
    try {
      const passwordHash = await crypto
        .createHash('sha256')
        .update(password)
        .digest('hex')

      const user = await new UserModel(name, passwordHash, email, goods)
      await req.db.collection('users').insertOne(user)

      return user
    } catch (err) {
      console.error(err)
    }
  }

  async findUserBySessionId(req, sessionId) {
    try {
      const session = await req.db.collection('sessions').findOne(
        { sessionId },
        {
          projection: { userId: 1 },
        }
      )
      if (!session) {
        return
      }

      return req.db
        .collection('users')
        .findOne({ _id: ObjectId(session.userId) })
    } catch (err) {
      console.error(err)
    }
  }

  async findUserByUsername(req, email) {
    try {
      const user = await req.db.collection('users').findOne({ email })
      if (user) {
        return user
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = UserService
