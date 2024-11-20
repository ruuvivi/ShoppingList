const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())

require('dotenv').config()

app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.item === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.item === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const Item = require('./models/item')

let items = []

app.use(morgan('tiny'))

morgan.token('body', function (req) {if (req.method === 'POST'){ return JSON.stringify(req.body) }})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/items', (request, response) => {
  Item.find({}).then(items => {
    response.json(items)
  })
})

const itemExists = (item) => {
  items.forEach(element => {
    if (element.item === item) {
      return true
    }
  })
  return false
}

app.get('/api/items/:id', (request, response, next) => {
  Item.findById(request.params.id).then(item => {
    if (item) {
      response.json(item.toJSON)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/items/:id', (request, response, next) => {
  Item.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/items/:id', (request, response, next) => {
  const { item } = request.body

  Item.findByIdAndUpdate(
    request.params.id,
    { item },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedItem => {
      response.json(updatedItem.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/items', (request, response, next) => {
  const body = request.body

  if (!body.item || !body.item) {
    return response.status(400).json({
      error: 'item is missing'
    })
  }

  if (itemExists(body.item)) {
    return response.status(400).json({
      error: 'item must be new to the list'
    })
  }
  const item = new Item({
    item: body.item,
  })
  item.save().then(savedItem => {
    response.json(savedItem.toJSON())
  })
    .catch(error => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})