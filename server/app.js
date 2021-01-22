const path = require('path')

const express = require('express')
const cookieParser = require('cookie-parser')
const app = require('express')()
const routes = require('./routes')

app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use('/static', express.static(path.join(__dirname, '/static')))

app.use('/', routes)

module.exports = app
