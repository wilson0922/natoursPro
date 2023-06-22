const express = require('express')
const tourController = require('./../controllers/tourController')

const router = express.Router()

router.param('id', tourController.checkId)

// Create a checkBody middleware function
// If body contains the name property and the price property
// If not, send back 400 (bad request)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour)

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour)

module.exports = router
