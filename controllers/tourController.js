const fs = require('fs')

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
)

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    })
  }
  next()
}

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`)
  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    })
  }
  next()
}

exports.getAllTours = (req, res) => {
  console.log(req.reqTime)
  res.status(200).send({
    status: 'success',
    requstedAt: req.reqTime,
    results: tours.length,
    data: { tours },
  })
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(el => el.id === id)

  res.status(200).send({
    status: 'success',
    data: { tour },
  })
}

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { tour: '<updated tour>' },
  })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  })
}
