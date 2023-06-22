const { dirname } = require('path')
const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// 1) Middlewars
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log('hi from the middleware')
  next()
})

app.use((req, res, next) => {
  req.reqTime = new Date().toISOString()
  next()
})

// 3) Route
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app
