require('dotenv').config()

const config = {
  DB_NAME: process.env.DB_NAME,
  DB_URI: process.env.DB_URI,
  PORT: process.env.PORT,
}

module.exports = config
