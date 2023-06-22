const express = require('express')
const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
)

const getAllTours = (req, res) => {
  console.log(req.reqTime)
  res.status(200).send({
    status: 'success',
    requstedAt: req.reqTime,
    results: tours.length,
    data: { tours },
  })
}

const getTour = (req, res) => {
  // console.log(req.params)
  // if (id > tours.length - 1)

  const id = req.params.id * 1
  const tour = tours.find(el => el.id === id)
  if (!tour) res.status(404).json({ status: 'fail', message: 'invalid ID' })

  res.status(200).send({
    status: 'success',
    data: { tour },
  })
}

const createTour = (req, res) => {
  // console.log(req.body)

  const newId = tours[tours.length - 1].id + 1

  const newTour = Object.assign({ id: newId }, req.body)
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
}

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length - 1)
    res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    })

  res.status(200).json({
    status: 'success',
    data: { tour: '<updated tour>' },
  })
}

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length - 1)
    res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    })

  res.status(204).json({
    status: 'success',
    data: null,
  })
}

const router = express.Router()

router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
