const AppError = require('../utils/appError')

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)
}

const handleDupFieldsDB = err => {
  const message = `Duplicate field value: ${err.keyValue.name}, Please use another value.`
  return new AppError(message, 400)
}

const handleValidationDB = err => {
  const errors = Object.values(err.errors)
    .map(el => el.message)
    .join(' ')
  const message = `Invalid input data. ${errors}`
  return new AppError(message, 400)
}

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401)

const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again.', 401)

const sendErrorDev = (err, req, res) => {
  // For API error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    })
  }

  // For Rendered Website error
  console.error(`${err}`)

  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  })
}

const senErrorProd = (err, req, res) => {
  // For API error
  if (req.originalUrl.startsWith('/api')) {
    // Operational
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      })
    }

    // Programing and others
    // 1) Log error
    console.error(`${err}`)

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong.',
    })
  }

  // For Rendered Website error
  // Operational
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    })
  }

  // Programing and others
  // 1) Log error
  console.error(`${err}`)

  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later!',
  })
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res)
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err)
    if (err.name === 'CastError') error = handleCastErrorDB(error)
    if (err.code === 11000) error = handleDupFieldsDB(error)
    if (err.name === 'ValidationError') error = handleValidationDB(error)
    if (err.name === 'JsonWebTokenError') error = handleJWTError()
    if (err.name === 'TokenExpiredError') error = handleJWTExpiredError()
    senErrorProd(error, req, res)
  }
}
